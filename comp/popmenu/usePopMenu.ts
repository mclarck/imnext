import { useCallback, useEffect, useState } from "react";
import { useRef } from "react";

const usePopMenu = () => {
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

    return { hide, menu, show, visible }
}
export default usePopMenu