import { gql } from '@apollo/client'

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
                        id
                        uri
                        path
                        name
                    }
                    product{
                        id
                        specie
                        mark
                        variety
                        container
                    }
                }
            }
        }
    }`

const GET_ALL_SPECIES = gql`
query GetStocks {
    stocks { 
        edges {
            node {
                product{
                    specie
                }
            }
        }
    }
}
`

export { GET_STOCKS, GET_ALL_SPECIES }