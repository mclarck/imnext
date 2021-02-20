import { useQuery } from "@apollo/client"
import { useContext, useState } from "react"
import { t } from "../../../../locale"
import { GET_FULL_CLIENT } from "../../../../model/client/queries"
import { AnalyticIO } from "../../../../services/io/IOProvider"
import { RestCtx } from "../../../../services/rest"

export default function useOrders({ session, company, user }) {
    const { data, loading: loadingClient, error: errorClient, refetch } = useQuery(GET_FULL_CLIENT, { fetchPolicy: "cache-and-network", variables: { id: user?.id } })
    const [orderState, setOrderState] = useState("active")
    const [loadingOrder, setLoadingOrder] = useState(false)
    const rest = useContext(RestCtx)
    const analytic = useContext(AnalyticIO)

    function handleError(error) {
        if (error) console.log(error.message || error)
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
        if (analytic) analytic.emit("message", { sender: user, room: company, content: { order } })
        refetch()
    }

    function onMessage(payload: any) {
        const state = payload?.state || "active"
        setOrderState(current => current = state)
        refetch()
    }

    function cleanAnalytic(socket: any) {
        if (socket) {
            socket.off("message", onMessage)
        }
    }

    handleError(errorClient)

    return { cancelOrder, orderState, client: data?.client, carts: data?.client?.operations?.edges, loading: loadingClient || loadingOrder }
}