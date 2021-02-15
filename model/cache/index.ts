import {InMemoryCache, makeVar} from '@apollo/client'

export const _cart: any = makeVar<any>([])
export const _auth: any = makeVar<any>({})

const cache = new InMemoryCache({
    addTypename: false,
    typePolicies: {
        Query: {
            fields: {
                items: {
                    read() {
                        return _cart()
                    }
                },
                auth: {
                    read() {
                        return _auth()
                    }
                }
            }
        }
    }
})

export default cache
