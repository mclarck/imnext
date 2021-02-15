import {gql} from '@apollo/client'
import {_auth} from '../cache'

export const GET_CART_ITEMS = gql`
    query GetCartItems {
        items @client
    }
`
const useCartModel = () => {
    const read = () => _auth()
    const add = (order: any) => {
        if (order?.quantity > 0) {
            const prev =  _auth()
            const items = [...prev, order]
            _auth(items)
        }
    }
    const remove = (order: any) => {
        const items = _auth().filter((o: any) => o !== order)
        _auth(items)
    }
    const clear = () => {
        _auth([])
    }
    return {add, remove, clear, read}
}

export default useCartModel
