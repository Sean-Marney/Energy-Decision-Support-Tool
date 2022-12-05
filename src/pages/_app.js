import "../styles/globals.css";
import { SessionProvider } from "next-auth/react";
import HeaderBar from "../components/HeaderBar";
import SideBar from "../components/SideBar";

function MyApp({ Component, pageProps }) {
  return (
    <div className="flex flex-col h-screen">
      <HeaderBar> </HeaderBar>
        <div className="grid grid-cols-6 grow">
          <div className="col-span-1">
            <SideBar />
          </div>
          <div className="col-span-5 flex">
            <SessionProvider session={pageProps.session}>
              <Component {...pageProps} />
            </SessionProvider>
          </div>
        </div>
    </div>
  );
}

import "../styles/main.scss";

export default MyApp;
