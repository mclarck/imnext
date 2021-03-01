import { useEffect, useState } from "react";
import { Manager } from "socket.io-client";
import { useRouter } from "next/router";
import Storager from "../storage";

const useIO = ({ io, session }) => {
  const [chat, setChat] = useState<any>();
  const [analytic, setAnalytic] = useState<any>();
  const {
    query: { company },
  } = useRouter();

  const onError = (e: any) => console.log(e.message);
  const onJoin = (payload: any) => {
    console.log(payload, "joined chat");
  };
  const onMsg = (payload: any) => {
    console.log(payload, "new message");
    const store = new Storager(company as string);
    if (!store.hasVal("messages")) store.setVal("messages", []);
    const msges: any[] = store.getVal("messages");
    if (payload?.content && payload?.content !== "") msges.push(payload);
    store.setVal("messages", msges);
  };
  const handleChat = (socket: SocketIOClient.Socket) => {
    console.log(session, "session handle chat")
    if (socket) {
      // we need to join a room
      if (session) {
        socket.emit("join", { ...session.user, iri: session?.user?.id });
        socket.on("joined", onJoin);
        socket.on("message", onMsg);
      }
    }
  };
  const cleanChat = (socket: SocketIOClient.Socket) => {
    if (socket) {
      socket.off("joined", onJoin);
      socket.off("message", onMsg);
      socket.disconnect();
    }
  };

  const cleanAnalytic = (socket: SocketIOClient.Socket) => {
    if (socket) {
      socket.disconnect();
    }
  };

  useEffect(() => {
    if (io) {
      const manager = new Manager(io?.uri, { ...io?.options });
      const chat = manager.socket("/chat");
      const analytic = manager.socket("/analytic");
      handleChat(chat);
      setChat(chat);
      setAnalytic(analytic);
    }
    return () => {
      cleanChat(chat);
      cleanAnalytic(analytic);
    };
  }, []);

  return { chatIO: chat, analyticIO: analytic };
};

export default useIO;
