import { Provider } from "next-auth/client";
import React from "react";
import { GraphqlProvider } from "../services/graphql";
import { SocketIOProvider } from "../services/io";
import { RestProvider } from "../services/rest";
import "../styles/globals.scss";

function MyApp({ Component, pageProps }) {
  const { session } = pageProps;
  return (
    <GraphqlProvider pageProps={pageProps}>
      <RestProvider>
        {/* <SocketIOProvider> */}
        <Provider session={session}>
          <Component {...pageProps} />
        </Provider>
        {/* </SocketIOProvider> */}
      </RestProvider>
    </GraphqlProvider>
  );
}

export default MyApp;
