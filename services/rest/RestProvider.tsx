import React, { useContext } from "react";
import RestManager from "./RestManager";

export const RestCtx = React.createContext<RestManager>(null);

const RestProvider = ({ children }) => {
  const rest = new RestManager({ uri: process.env.API_REST_URL });
  return <RestCtx.Provider value={rest}> {children}</RestCtx.Provider>;
};
 
export default RestProvider;
