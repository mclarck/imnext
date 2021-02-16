import { useQuery } from "@apollo/client";
import _ from "lodash";
import { GET_CART_ITEMS } from "../../model/cart";

export default function useToBar() {
    const { data: cart, error } = useQuery(GET_CART_ITEMS);
    if (error) console.log(error);

    return { cartSize: cart?.items?.length, cartIsEmpty: _.isEmpty(cart?.items) }
}