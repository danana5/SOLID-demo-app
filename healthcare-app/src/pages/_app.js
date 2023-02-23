import '@/styles/globals.css'
import { SessionProvider } from "@inrupt/solid-ui-react";

export default function App({ Component, pageProps }) {
  return <SessionProvider><Component {...pageProps} /></SessionProvider>
}
