import { MainLayout } from "../comp/layout";
import { GraphqlProvider } from "../services/graphql";
import { SocketIOProvider } from "../services/io";
import { RestProvider } from "../services/rest";
import "../styles/globals.scss";

function MyApp({ Component, pageProps }) {
  return (
    <GraphqlProvider pageProps={pageProps}>
      <RestProvider>
        {/* <SocketIOProvider> */}
        <Component {...pageProps} />
        {/* </SocketIOProvider> */}
      </RestProvider>
    </GraphqlProvider>
  );
}

export default MyApp;
