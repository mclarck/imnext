import { gql } from '@apollo/client'
import { _cart } from '../cache'

export const GET_CART_ITEMS = gql`
    query GetCartItems {
        items @client
    }
`
const useCartModel = () => {
    const read = () => _cart()
    const add = (order: any) => {
        if (order?.quantity > 0) {
            const prev = _cart() || [] 
            const items = [...prev, order]
            _cart(items)
        }
    }
    const remove = (order: any) => {
        const items = _cart().filter((o: any) => o !== order)
        _cart(items)
    }
    const clear = () => {
        _cart([])
    }
    return { add, remove, clear, read }
}

export default useCartModel
