import React from "react";
import useIO from "./useIO"; 

export const ChatIO = React.createContext<SocketIOClient.Socket>(null)
export const AnalyticIO = React.createContext<SocketIOClient.Socket>(null)

export const SocketIOProvider = ({pageProps, children}) => {
    const {chatIO, analyticIO} = useIO(pageProps)
    return (
        <ChatIO.Provider value={chatIO}>
            <AnalyticIO.Provider value={analyticIO}>
                <React.Fragment>
                    {children}
                </React.Fragment>
            </AnalyticIO.Provider>
        </ChatIO.Provider>
    )
}
