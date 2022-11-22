import "../styles/globals.css";
import { SessionProvider } from "next-auth/react";
import HeaderBar from "../components/HeaderBar";
import SideBar from "../components/SideBar";

function MyApp({ Component, pageProps }) {
  return (
    <HeaderBar>
      <div className="grid grid-cols-6 h-screen">
        <div className="col-span-1">
          <SideBar />
        </div>
        <div className="col-span-5">
          <SessionProvider session={pageProps.session}>
            <Component {...pageProps} />
          </SessionProvider>
        </div>
      </div>
    </HeaderBar>
  );
}

export default MyApp;
