import { useQuery } from "@apollo/client";
import { useRouter } from "next/router";
import { useState } from "react";
import useCartModel, { GET_CART_ITEMS } from "../../../../model/cart";

export default function useCart() {
    const {
        query: { company },
    } = useRouter();
    const { data: cart, error } = useQuery(GET_CART_ITEMS)
    const { remove } = useCartModel()
    const [alert, setAlert] = useState()
    if (error) console.log(error.message)
    const bills = [
        { name: "Sub Total", value: 450 },
        { name: "IVA", value: 0.5 },
        { name: "Envio", value: 80 },
        { name: "Total", value: 500, isTotal: true }
    ]

    function pay() {

    }

    return { company, cart: cart?.items, bills, pay, alert, remove }
}