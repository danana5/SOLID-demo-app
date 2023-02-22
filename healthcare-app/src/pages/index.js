import { SessionProvider, LoginButton } from "@inrupt/solid-ui-react";
import Head from 'next/head'

export default function HomePage() {

  return (
    <div>
      <Head>
        <title>Home Page</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <SessionProvider sessionId="somes-id">
        <LoginButton
          oidcIssuer="https://inrupt.net"
          redirectUrl="https://localhost:3000/"
        />
      </SessionProvider>s
    </div>
  );
}