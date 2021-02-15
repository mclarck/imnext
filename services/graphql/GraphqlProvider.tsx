import React, { useContext } from "react";
import { ApolloClient, ApolloProvider } from "@apollo/client";
import cache from "../../model/cache";

export const GraphqlCtx = React.createContext<ApolloClient<any>>(null);

const GraphqlProvider = ({ children }) => {
  const client = new ApolloClient({
    uri: process.env.API_GRAPHQL_URL,
    cache: cache,
  });
  return (
    <GraphqlCtx.Provider value={client}>
      <ApolloProvider client={client}>{children}</ApolloProvider>
    </GraphqlCtx.Provider>
  );
};
 
export default GraphqlProvider;
