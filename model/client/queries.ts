import {gql} from '@apollo/client'

const GET_CLIENT = gql`
    query GetClient($id:ID!) {
        client(id: $id) {
            id
            created
            username
            email
            phone
            address{
                id
                street
                apt
                number
                location{
                    id
                    x
                    y
                    label
                }
            }
        }
    }`
const GET_FULL_CLIENT = gql`
    query GetFullClient($id:ID!) {
        client(id: $id) {
            id
            created
            status
            username
            email
            phone
            operations{
                edges{
                    node{
                        id
                        created
                        amount
                        status
                        orders{
                            edges{
                                node{
                                    id
                                    created
                                    quantity
                                    stock{
                                        id
                                        price
                                        tax
                                        cost
                                        shipping
                                        shippingAdditional
                                        file{
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
                        }
                    }
                }
            }
            address{
                id
                street
                apt
                number
                location{
                    id
                    x
                    y
                    label
                }
            }
        }
    }`


export {GET_CLIENT, GET_FULL_CLIENT}