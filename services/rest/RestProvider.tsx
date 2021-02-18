import React from "react";
import RestManager from "./RestManager";

export function initializeRest(headers?: any) {
  return new RestManager({ uri: process.env.API_REST_URL, headers });
}

export const RestCtx = React.createContext<RestManager>(null);

const RestProvider = ({ children, pageProps }) => {
  const { rest } = pageProps; 
  const restMan = new RestManager(rest);
  return <RestCtx.Provider value={restMan}> {children}</RestCtx.Provider>;
};

export default RestProvider;
