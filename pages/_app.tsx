import "../styles/globals.scss";
import { SessionProvider } from "next-auth/react";
import type { AppProps } from "next/app";

function MyApp({ Component, pageProps: { session, ...pageProps } }: AppProps) {
  <SessionProvider session={session}>
    <Component {...pageProps} />
  </SessionProvider>;
}

export default MyApp;
