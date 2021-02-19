import { useQuery } from "@apollo/client"
import { useContext, useState } from "react"
import { t } from "../../../../locale"
import { GET_FULL_CLIENT } from "../../../../model/client/queries"
import { RestCtx } from "../../../../services/rest"

export default function useOrders({ session, company }) {
    const { data, loading: loadingClient, error: errorClient, refetch } = useQuery(GET_FULL_CLIENT, { fetchPolicy: "cache-and-network", variables: { id: `/api/clients/${session.user.id}` } })
    const [orderState, setOrderState] = useState("active")
    const [loadingOrder, setLoadingOrder] = useState(false)
    const rest = useContext(RestCtx)

    function handleError(error) {
        if (error) console.log(error.message || error)
    }

    function onReload() {
        refetch()
    }

    async function cancelOrder(order: any) {
        try {
            setLoadingOrder(true)
            const confirmation = await confirm(t("Order will be canceled, continue?"))
            if (confirmation) {
                const response = await rest.mutate("PUT", order.id, { status: "suspended" })
                if (response.ok) {
                    onCanceled(order)
                }
            }
        } catch (error) {
            handleError(error)
        } finally {
            setLoadingOrder(false)
        }
    }

    function onCanceled(order: any) {
        refetch()
        notifyOrder()
    }

    function notifyOrder() {

    }

    handleError(errorClient)

    return { cancelOrder, orderState, client: data?.client, carts: data?.client?.operations?.edges, loading: loadingClient || loadingOrder, onReload, }
}