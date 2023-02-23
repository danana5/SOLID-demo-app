import Head from 'next/head'
import HomeToolbar from '../../components/toolbar'

export default function AdminAccount() {

    return (
        <div>
            <Head>
                <title>Account - Admin</title>
                <meta name="viewport" content="width=device-width, initial-scale=1" />
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <HomeToolbar color='secondary' title="Solid Health Admin" />
        </div>
    );
}