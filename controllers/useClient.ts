import { useRouter } from "next/router"
import { useContext, useEffect, useRef, useState } from "react"
import { useForm } from "react-hook-form"
import { isMail } from "../lib/ultils"
import { t } from "../locale"
import { RestCtx } from "../services/rest"
import { signIn, useSession } from "next-auth/client";
import useLocation from "./useLocation"

export default function useClient() {
    const [session] = useSession()
    const { register, handleSubmit } = useForm()
    const rest = useContext(RestCtx)
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState<any>({})
    const [preview, setPreview] = useState<any>()
    const [data, setData] = useState<any>({})
    const [confirmed, setConfirm] = useState<boolean>(false)
    const [registered, setRegistered] = useState<boolean>(false)
    const [tosAcceted, handleTos] = useState<boolean>(false)
    const [offerAccepted, handleOffer] = useState<boolean>(false)
    const recaptcha = useRef(null);
    const { query: { company }, replace } = useRouter();
    const { confirmLocation, checkLocation } = useLocation()
    const [location, setLocation] = useState<any>()


    async function login(data: any) {
        try {
            setLoading(true)
            const recaptchaToken = await recaptcha.current?.executeAsync()
            data.recaptcha = recaptchaToken
            const token = { ...prepare(data), company: company, redirect: false }
            const response: any = await signIn("client-login", token)
            if (response.ok)
                onLoginSucess(response)
            else
                onLoginFailure(response)
        } catch (error) {
            console.log(error.message)
        } finally {
            setLoading(false)
        }
    }

    function onLoginSucess(token: any) {
        console.log(token?.username, "onLoginSuccess")
        replace(`/${company}`)
    }

    function onLoginFailure(token: any) {
        console.log("fail to login", "onLoginFailure")
        setError({ login: t("Fail to login") })
    }

    async function registration(data: any) {
        try {
            setLoading(true)
            const location = await checkLocation(data?.address)
            setLocation(current => current = location)
            const recaptchaToken = await recaptcha.current?.executeAsync()
            data.recaptcha = recaptchaToken
            await confirmLocation();
            data.address.location = location
            const response: any = await rest.mutate("POST", "/api/clients", prepare(data))
            if (response.ok)
                onRegistrationSuccess(response)
            else
                onRegistrationFailure(response)
        } catch (error) {
            console.log(error.message)
        } finally {
            setLoading(false)
        }
    }

    function onRegistrationSuccess(res: any) {
        console.log(res.status, "onRegistrationSuccess")
        replace(`/${company}`)
    }


    function onRegistrationFailure(res: any) {
        console.log(res.status, "onRegistrationFailure")
        setError({ username: t("Fail to register, please try again later") })
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

    return { t, location, replace, session, login, registration, company, recaptcha, resetAddress, error, loading, register, handleSubmit, handleTos, handleOffer }
}