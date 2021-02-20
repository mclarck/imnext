
import { useContext, useEffect, useState } from "react";
import { ChatIO } from "../services/io/IOProvider";
import Storager from "../services/storage";

export default function useChat({ company, session, user }) {

    const chat = useContext(ChatIO)
    const [messages, setMessages] = useState([])

    async function persistMsg(msg: any) {
        try {
            if (msg) {
                const storage = new Storager(company)
                if (!storage.hasVal("chat")) storage.setVal("chat", [])
                storage.addVal("chat", mapMsg(msg))
                setMessages(current => current = storage.getVal("chat"))
            }
        } catch (error) {
            handleError(error)
        }
    }
    function clear() {
        const storage = new Storager(company)
        if (storage.hasVal("chat")) storage.removeItem("chat")
        setMessages(current => current = [])
    }
    function mapMsg(msg: any) {
        if (msg) {
            msg.isSender = (msg.sender?.phone === user?.phone)
        }
        return msg
    }
    function onReceiveMsg(payload: any) {
        console.log(payload, "received")
        persistMsg(payload)
        return payload;
    }
    function buildPayload(msg: string) {
        return {
            sender: user,
            dest: { usename: company, phone: company },
            company: company,
            content: msg
        }
    }
    async function send(msg: string) {
        try {
            const payload = buildPayload(msg);
            chat.emit("message", payload)
        } catch (error) {
            handleError(error)
        }
    }
    function cleanChatIO(socket: any) {
        if (socket) {
            socket.off("message", onReceiveMsg)
        }
    }
    function handleError(error) {
        if (error) console.log(error.message)
    }
    useEffect(() => {
        const storage = new Storager(company)
        if (!storage.hasVal("chat")) storage.setVal("chat", []) 
        setMessages(current => current = storage.getVal("chat"))
        if (chat) {
            chat.on("message", onReceiveMsg)
        }
        return () => {
            cleanChatIO(chat)
        }
    }, [])
    return { send, messages, clear }
}