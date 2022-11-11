import "../styles/globals.css";
import { SessionProvider } from "next-auth/react";
import Layout from "../layout/layout";

function MyApp({ Component, pageProps }) {
  return (
    <Layout>
      <SessionProvider session={pageProps.session}>
        <Component {...pageProps} />
      </SessionProvider>
    </Layout>
  );
}

export default MyApp;
