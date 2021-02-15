import {gql} from "@apollo/client";

const GET_SETTING = gql`
    query GetSetting($id: ID!) {
        setting(id: $id) {
            id
            created
            description
            openTime
            closeTime
            openDays
            bounds
            emails
            phones
            name
            alias
            title
            description
            country
            file {
                id
                mime
                uri
                path
                name
                ext
                type
                size
            }
            address {
                id
                street
                number
                apt
                location {
                    id
                    x
                    y
                    label
                }
            }
        }
    }

`

export {GET_SETTING}