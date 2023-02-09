import Head from 'next/head'
import Image from 'next/image'
import { Inter } from '@next/font/google'
import styles from '@/styles/Home.module.css'

const inter = Inter({ subsets: ['latin'] })

export default function Home() {
  return (
    <>
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className={styles.main}>
       <SessionProvider sessionId="log-in-example">
  <p>
    <em>
      Note:{' '}
    </em>
    to test out the Authentication examples, you will need to click the pop-out icon on the top right to open this example in a new tab first.
  </p>
  <LoginButton
    oidcIssuer="https://inrupt.net"
    redirectUrl="https://solid-ui-react.docs.inrupt.com/iframe.html?/=&viewMode=docs&id=authentication-login-button--with-children&args="
  >
    <WithStyles color="primary">
      Log In
    </WithStyles>
  </LoginButton>
</SessionProvider>
      </main>
    </>
  )
}
