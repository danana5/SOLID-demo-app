import Head from 'next/head'
import HomeToolbar from '../../components/toolbar'

export default function PatientAccount() {

    return (
        <div>
            <Head>
                <title>Account - Patient</title>
                <meta name="viewport" content="width=device-width, initial-scale=1" />
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <HomeToolbar color='primary' />
        </div>
    );
}