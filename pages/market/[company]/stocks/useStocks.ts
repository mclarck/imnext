import { useQuery } from "@apollo/client";
import { useRouter } from "next/router";
import useCartModel from "../../../../model/cart";
import { GET_STOCKS } from "../../../../model/stock/queries";

export default function useStocks() {
    const {
        query: { company, category },
    } = useRouter();
    const { add } = useCartModel();


    function addToCart(arg: any) {
        const stock = { id: "/api/stocks/1" };
        add({ ...arg, stock });
    }
    return { addToCart, company, category }
}