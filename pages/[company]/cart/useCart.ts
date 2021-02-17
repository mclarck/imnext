import { useQuery } from "@apollo/client";
import _ from "lodash";
import { useSession } from "next-auth/client";
import { useRouter } from "next/router";
import { useState } from "react";
import { t } from "../../../locale";
import useCartModel, { GET_CART_ITEMS } from "../../../model/cart";
import { useCalculator } from "../../../services/utils";

export default function useCart() {
    const {
        query: { company },
        replace
    } = useRouter();
    const { data: cart, error, refetch } = useQuery(GET_CART_ITEMS)
    const { remove, clear } = useCartModel()
    const [alert] = useState()
    const { subTotal, shipment, amount } = useCalculator(cart?.items)
    const [session, loading] = useSession()

    if (error) console.log(error.message)

    const bills = [
        { name: t("SubTotal"), value: subTotal() },
        { name: t("Shipping"), value: shipment() },
        { name: t("Total"), value: amount(), isTotal: true }
    ]

    function pay() {
        console.log('process payment')
        clear()
        replace(`${company}/payment/success`)
    }

    function onRemove(order) {
        remove(order);
        refetch()
    }

    return { session, replace, loading, company, isEmptyCart: _.isEmpty(cart?.items), cart: cart?.items, bills, pay, alert, remove: onRemove }
}