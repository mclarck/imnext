import { useQuery } from "@apollo/client";
import _ from "lodash";
import { useRouter } from "next/router";
import { GET_CART_ITEMS } from "../../model/cart";

export default function useToBar() {
    const {
        query: { company }, 
    } = useRouter();
    const { data: cart, error } = useQuery(GET_CART_ITEMS);
    if (error) console.log(error);

    return { company, cartSize: cart?.items?.length, cartIsEmpty: _.isEmpty(cart?.items) }
}