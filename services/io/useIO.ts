import { useContext, useEffect, useState } from "react"
import { Manager } from "socket.io-client"
import { Howl } from 'howler';

const useIO = () => {
    const [chat, setChat] = useState<any>()
    const [analytic, setAnalytic] = useState<any>()

    const playNotice = () => {
        const sound = new Howl({ src: ['/audio/message.mp3', '/audio/message.ogg', '/audio/message.m4r'] });
        sound.play()
    }
    const onError = (e: any) => console.log(e.message)
    const sendMsgToServer = async (msg: any) => {
        try {
            // return await rest?.request("POST", "/api/chats", msg)
        } catch (e) {
            console.log(e.message)
            return e
        }
    }
    const onJoin = (payload: any) => {
    }
    const onMsg = (payload: any) => {
        // if (!store.hasVal("chat")) store.setVal("chat", [])
        // store.addVal("chat", payload)
        const notify = () => {
            // if (payload?.sender?.phone === company) { playNotice()  }
        }
        sendMsgToServer(payload).then(res => notify()).catch(onError)
    }
    const onAnalEvent = (payload: any) => {
        const status = payload?.content?.status
        const id = payload?.content?.id
    }
    const handleChat = (socket: SocketIOClient.Socket) => {
        // we need to join a room
        // client need to join his phone
        // socket.emit("join", {room: sender?.phone})
        // socket.emit("register", {content: sender})
        socket.on("join", onJoin)
        socket.on("message", onMsg)
    }
    const handleAnalytic = (socket: SocketIOClient.Socket) => {
        // socket.emit("join", {room: "analytic@" + company})
        socket.on("message", onAnalEvent)
    }
    const cleanChat = (socket: SocketIOClient.Socket) => {
        if (socket) {
            socket.off("join", onJoin)
            socket.off("message", onMsg)
            socket.disconnect()
        }
    }
    const cleanAnalytic = (socket: SocketIOClient.Socket) => {
        if (socket) {
            socket.off("message", onAnalEvent)
            socket.disconnect()
        }
    }

    useEffect(() => {
        const manager = new Manager(process.env.SOCKET_URL, {})
        const chat = manager.socket("/chat")
        const anal = manager.socket("/analytic")
        handleChat(chat)
        handleAnalytic(anal)
        setChat(chat)
        setAnalytic(anal)
        return () => {
            cleanChat(chat)
            cleanAnalytic(anal)
        }
    }, [])

    return { chatIO: chat, analyticIO: analytic }
}

export default useIO