import { useQuery } from "@apollo/client"
import { useForm } from "react-hook-form"
import { GET_CLIENT } from "../model/client/queries"
import { useContext, useState } from "react"
import { t } from "i18n-js"
import { useRouter } from "next/router"
import { RestCtx } from "../services/rest"
import _ from "lodash"
import useLocation from "./useLocation"

export default function useProfile({ session, company, user }) {
    const { register, handleSubmit } = useForm()
    const { data, loading, error } = useQuery(GET_CLIENT, { variables: { id: user?.id } })
    const [location, setLocation] = useState<any>()
    const [formError, setFormError] = useState<any>({})
    const rest = useContext(RestCtx)
    const router = useRouter()
    const { confirmLocation, checkLocation } = useLocation() 

    function handleError(error) {
        if (error) {
            setFormError(error)
            console.log(error?.message || error, "error")
        }
    }

    async function submit(data: any) {
        try {
            const location = await checkLocation(data?.address)
            setLocation(current => current = location)
            await confirmLocation();
            data.address.location = location
            const response = await rest.mutate("PUT", data.id, data)
            const json = await response.json() 
            router.reload()
        } catch (error) {
            handleError(error)
        }
    }
    if (error) handleError(error)
    return { location, loading, error: formError, register, user: data?.client, handleSubmit, submit }
}