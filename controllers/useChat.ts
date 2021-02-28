import { useContext, useEffect, useState } from "react";
import { ChatIO } from "../services/io/IOProvider";
import Storager from "../services/storage";

export default function useChat({ company, session, user }) {
  const chat = useContext(ChatIO);
  const [messages, setMessages] = useState([]);

  function filterConversation(msges: any[]) {
    return msges?.filter((msg: any) => {
      return (
        (msg?.sender?.iri === user.id && msg?.dest?.iri === company) ||
        (msg?.sender?.iri === company && msg?.dest?.iri === user.id)
      );
    });
  }
  function clear() {
    const storage = new Storager(company);
    storage.setVal("messages", []);
    onReceiveMsg();
  }
  function mapMsg(msges: any[]) {
    return msges.map((msg) => ({
      ...msg,
      isSender: msg?.sender?.iri === user.id,
    }));
  }
  function onReceiveMsg() {
    const store = new Storager(company);
    let msges: any[] = store.getVal("messages");
    msges = mapMsg(msges);
    setMessages(msges);
  }
  function buildPayload(msg: string) {
    return {
      sender: { ...user, iri: user.id },
      dest: { iri: company },
      content: msg,
    };
  }
  async function send(msg: string) {
    try {
      const payload = buildPayload(msg);
      if(chat) chat.emit("message", payload);
    } catch (error) {
      handleError(error);
    }
  }
  function cleanChatIO(socket: any) {
    if (socket) {
      socket.off("message", onReceiveMsg);
    }
  }
  function handleError(error) {
    if (error) console.log(error.message);
  }
  useEffect(() => {
    if (chat) {
      chat.on("message", onReceiveMsg);
    }
    return () => {
      cleanChatIO(chat);
    };
  }, []);
  return { filterConversation, send, messages, clear };
}
