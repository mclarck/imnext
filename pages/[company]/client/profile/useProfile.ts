import { useQuery } from "@apollo/client"
import { useForm } from "react-hook-form"
import { GET_CLIENT } from "../../../../model/client/queries"
import { useContext, useState } from "react"
import { t } from "i18n-js"
import { useRouter } from "next/router"
import { RestCtx } from "../../../../services/rest"
import _ from "lodash"

export default function useProfile({ session, company, user }) {
    const { register, handleSubmit } = useForm()
    const { data, loading, error } = useQuery(GET_CLIENT, { variables: { id: user.id } })
    const [location, setLocation] = useState<any>()
    const [formError, setFormError] = useState<any>({})
    const rest = useContext(RestCtx)
    const router = useRouter()
    console.log(session, "useProfile")

    function handleError(error) {
        if (error) {
            setFormError(error)
            console.log(error?.message || error, "error")
        }
    }
    async function checkLocation(arg: any) {
        return new Promise(async (resolve, reject) => {
            if (arg.street && arg.number) {
                const provider: any = (await import('../../../../comp/map/provider')).default
                const OpenStreetMapProvider = provider()
                const query = `${arg.street} ${arg.number}, ${arg.city || "CABA, Argentina"}`
                const results = await OpenStreetMapProvider.search({ query })
                if (!_.isEmpty(results)) {
                    const location = results[0]
                    setLocation(location)
                    resolve(location)
                }
            }
            reject({ address: { street: t("Invalid location") }, message: `${JSON.stringify(arg)}: invalid location` })
        })
    }
    async function confirmLocation() {
        return new Promise((resolve, reject) => {
            const isOk = window.confirm(t("Is it the good address?"))
            if (isOk) {
                resolve(true)
            }
            reject({ address: { street: t("Please, confirm location") }, message: "location unconfirmed" })
        })
    }
    async function submit(data: any) {
        try {
            const location = await checkLocation(data?.address)
            await confirmLocation();
            data.address.location = location
            const response = await rest.mutate("PUT", data.id, data)
            const json = await response.json()
            console.log(json, "client data")
            router.reload()
        } catch (error) {
            handleError(error)
        }
    }
    if (error) handleError(error)
    return { location, loading, error: formError, register, user: data?.client, handleSubmit, submit }
}