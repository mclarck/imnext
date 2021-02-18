import React, { useContext } from "react";
import { ApolloClient, ApolloProvider } from "@apollo/client"; 
import { useApollo } from "./apolloClient";

export const GraphqlCtx = React.createContext<ApolloClient<any>>(null);

const GraphqlProvider = ({ children, pageProps }) => {
  const client = useApollo(pageProps);
  return (
    <GraphqlCtx.Provider value={client}>
      <ApolloProvider client={client}>{children}</ApolloProvider>
    </GraphqlCtx.Provider>
  );
};

export default GraphqlProvider;
