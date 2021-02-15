import {gql} from '@apollo/client'

const GET_STOCKS = gql`
    query GetStocks {
        stocks {
            totalCount
            edges {
                node {
                    id
                    created
                    status
                    quantityAv
                    price
                    oldPrice
                    tax
                    shipping
                    shippingAdditional
                    devise
                    fraction
                    file{
                        uri
                        path
                        name
                    }
                    product{
                        specie
                        mark
                        variety
                        container
                    }
                }
            }
        }
    }`


export {GET_STOCKS}