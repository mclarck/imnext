import { useQuery } from "@apollo/client";
import _ from "lodash";
import { useSession } from "next-auth/client";
import { useRouter } from "next/router";
import { useContext, useState } from "react";
import { t } from "../locale";
import useCartModel, { GET_CART_ITEMS } from "../model/cart";
import { RestCtx } from "../services/rest";
import { useCalculator } from "../services/utils";

export default function useCart() {
    const {
        query: { company },
        replace,
        isReady
    } = useRouter();
    const { data: cart, error, refetch } = useQuery(GET_CART_ITEMS)
    const { remove, clear } = useCartModel()
    const [isOrderSent, setIsOrderSent] = useState(false)
    const [processing, setIsProccesing] = useState(false)
    const { subTotal, shipment, amount } = useCalculator(cart?.items)
    const [session, loading] = useSession()
    const rest = useContext(RestCtx)
    const client: any = session?.user

    const bills = [
        { name: t("SubTotal"), value: subTotal() },
        { name: t("Shipping"), value: shipment() },
        { name: t("Total"), value: amount(), isTotal: true }
    ]

    function handleError(error) {
        if (error) console.log(error.message)
    }

    async function processPayment() {
        try {
            setIsProccesing(true)
            const transaction = {
                type: "cash",
                amount: parseFloat(amount()),
                shipping: parseFloat(shipment()),
                client: `/api/clients/${client?.id}`,
                orders: _.map(cart?.items, (o) => ({ quantity: o.quantity, stock: o.stock?.id }))
            }
            const response = await rest.mutate("POST", "/api/operations", transaction)
            if (response.ok) {
                transactionSuccess(await response.json())
            } else {
                alert(t("An error has occured during the transaction, please contact us"))
            }
        } catch (error) {
            handleError(error)
        } finally {
            setIsProccesing(false)
        }
    }

    function onRemove(order) {
        remove(order);
        refetch()
    }

    function onClickMyOrders() {
        clear()
        replace(`/${company}/client/orders`)
    }
    function onClickKeepShopping() {
        clear()
        replace(`/${company}`)
    }

    function transactionSuccess(transaction?: any) {
        console.log(transaction)
        setIsOrderSent(true)
    }

    function notifyTransaction() {

    }

    handleError(error)

    return { onClickKeepShopping, onClickMyOrders, session, isOrderSent, replace, loading: !isReady || loading || processing, company, isEmptyCart: _.isEmpty(cart?.items), cart: cart?.items, bills, processPayment, remove: onRemove }
}