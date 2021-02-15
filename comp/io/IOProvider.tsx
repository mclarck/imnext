import React from "react";
import useIO from "./useIO"; 

export const ChatIO = React.createContext<SocketIOClient.Socket | undefined>(undefined)
export const AnalyticIO = React.createContext<SocketIOClient.Socket | undefined>(undefined)

export const SocketIOProvider = (props: any) => {
    const {chatIO, analyticIO} = useIO()
    return (
        <ChatIO.Provider value={chatIO}>
            <AnalyticIO.Provider value={analyticIO}>
                <React.Fragment>
                    {props.children}
                </React.Fragment>
            </AnalyticIO.Provider>
        </ChatIO.Provider>
    )
}
