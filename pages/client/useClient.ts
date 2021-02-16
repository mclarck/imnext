import { useContext, useEffect, useRef, useState } from "react"
import { useForm } from "react-hook-form"
import { isMail } from "../../lib/ultils"
import { t } from "../../locale"
import { RestCtx } from "../../services/rest"

export default function useClient() {
    const { register, handleSubmit } = useForm()
    const rest = useContext(RestCtx)
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState<any>({})
    const [preview, setPreview] = useState<any>()
    const [data, setData] = useState<any>({})
    const [confirmed, setConfirm] = useState<boolean>(false)
    const [registered, setRegistered] = useState<boolean>(false)
    const [tosAcceted, handleTos] = useState<boolean>()
    const [offerAccepted, handleOffer] = useState<boolean>()
    const recaptcha = useRef(null)

    const submit = async (data: any) => {
        try {
            const recaptchaToken = await recaptcha.current?.asyncExecute()
            console.log(recaptchaToken)
        } catch (error) {
            console.log(error.message)
        }
    }

    async function checkClient(captchaToken) {
        try {
            const res = await rest?.request("POST", "/security/client", prepare(data))
            if (!res.ok) return setError({ login: t("Client not found!") })
            const json = await res.json()
            json.id = "/api/clients/" + json.id
            delete json.operations
            // store.setVal("auth", json)
            // if (arg.onLogged) arg.onLogged()
        } catch (error) {
            console.log(error.message)
            return setError({ login: t("An error has occured!") })
        } finally {
            setLoading(false)
        }
    }

    const prepare = (data: any) => {
        if (isMail(data?.login)) {
            data.email = data?.login
        } else {
            data.username = data?.login
        }
        delete data?.login
        return data
    }

    const resetAddress = () => {
        setPreview(null)
        setConfirm(false)
    }

    return { t, recaptcha, resetAddress, error, loading, submit, register, handleSubmit, handleTos, handleOffer }
}