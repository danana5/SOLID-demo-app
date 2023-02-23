import Head from 'next/head'
import { useSession } from "@inrupt/solid-ui-react";
import HomeToolbar from '../components/toolbar'
import Button from '@mui/material/Button';
import Skeleton from '@mui/material/Skeleton';
import Container from '@mui/material/Container';
import Link from 'next/link'
// { useRouter } from 'next/router';


export default function HomePage() {


    const { session, sessionRequestInProgress, logout } = useSession();
    let page;
    //const router = useRouter();


    if (sessionRequestInProgress) {
        page = (<Skeleton variant="rectangular" width={210} height={60} />)
    }
    else if (session.info.isLoggedIn) {
        console.log(session.info.webId)
        page = (<Button onClick={logout}>LogOut</Button>)
        console.log('requesting')
        fetch('/api/profile/').then((res) => {
            console.log(res)

        })
        console.log('recieved')
    }
    else if (!session.info.isLoggedIn) {
        //router.push({ pathname: '/login' })
        page = (<Link href="/login"><Button>Log In</Button></Link>)
    }

    return (
        <div>
            <Head>
                <title>Home Page</title>
                <meta name="viewport" content="width=device-width, initial-scale=1" />
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <HomeToolbar color='primary' />
            <Container>
                {page}
            </Container>
        </div>
    );
}