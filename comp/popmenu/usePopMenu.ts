import { signout, useSession } from "next-auth/client";
import { useRouter } from "next/router";
import { useCallback, useEffect, useState } from "react";
import { useRef } from "react";
import { t } from "../../locale";

const usePopMenu = () => {
    const [session, loading] = useSession()
    const { query: { company } } = useRouter();
    const [visible, showMenu] = useState<boolean>(false)
    const menu = useRef<any>()
    const show = () => showMenu((visible: boolean) => visible = true)
    const hide = () => showMenu((visible: boolean) => visible = false)
    const handleClick = useCallback((e: any) => {
        if (visible) {
            if (e.target.tagName === "A") {
                setTimeout(() => hide(), 500)
            } else {
                hide()
            }
        }
    }, [visible])

    useEffect(() => {
        window.addEventListener("click", handleClick)
        return () => {
            window.removeEventListener("click", handleClick)
        }
    }, [handleClick])

    async function logOut(e: any) {
        e.preventDefault()
        if(await confirm(t("Disconnect ?"))){
            console.log('will signout')
            signout({ callbackUrl: `/kioskito` })
        }
    }

    return { hide, logOut, company, menu, show, visible, session, loading }
}
export default usePopMenu