import { useQuery } from "@apollo/client"
import { GET_FULL_CLIENT } from "../../../../model/client/queries"

export default function useOrders({ session, company }) {
    const { data, loading, error, refetch } = useQuery(GET_FULL_CLIENT, { variables: { id: `/api/clients/${session.user.id}` } })

    function handleError(error) {
        if (error) console.log(error.message || error)
    }

    function onReload() {
        refetch()
    }

    if (error) handleError(error)
    return { client: data?.client, carts: data?.client?.operations?.edges, loading, onReload, }
}