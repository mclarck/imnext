import { useQuery } from "@apollo/client";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { t } from "../../../../locale";
import useCartModel, { GET_CART_ITEMS } from "../../../../model/cart";
import { useCalculator } from "../../../../services/utils";

export default function useCart() {
    const {
        query: { company },
        replace
    } = useRouter();
    const { data: cart, error, refetch } = useQuery(GET_CART_ITEMS)
    const { remove, clear } = useCartModel()
    const [alert, setAlert] = useState()
    const { subTotal, shipment, amount } = useCalculator(cart?.items)

    if (error) console.log(error.message)

    const bills = [
        { name: t("SubTotal"), value: subTotal() },
        { name: t("Shipping"), value: shipment() },
        { name: t("Total"), value: amount(), isTotal: true }
    ]

    function pay() {
        console.log('process payment')
        clear()
        replace(`/market/${company}/payment/success`)
    }

    function onRemove(order) {
        remove(order);
        refetch()
    }

    return { company, cart: cart?.items, bills, pay, alert, remove: onRemove }
}