import { useRouter } from "next/router"; 
import useCartModel from "../../../model/cart";

export default function useStocks() {
    const {
        query: { company, category },
    } = useRouter();
    const { add } = useCartModel();


    function addToCart(arg: any) {
        add(arg);
    }
    return { addToCart, company, category }
}