import Head from 'next/head'
import { useSession, CombinedDataProvider, Text } from "@inrupt/solid-ui-react";
import HomeToolbar from '../components/toolbar'
import Button from '@mui/material/Button';
import Skeleton from '@mui/material/Skeleton';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import { checkIfDatasetExists, getPodUrls, getAllFilesFromDataset } from '../utils/pods'
import Link from 'next/link'
import { useEffect, useState } from 'react';


export default function HomePage() {

    const [pods, setPods] = useState([])
    const [files, setFiles] = useState([])

    const { session, sessionRequestInProgress, logout } = useSession();
    let page;
    let webId;
    let podUrl;

    useEffect(() => {

        async function getPods(webId, session) {
            let res = await getPodUrls(webId, session)
            setPods(res)
        }
        if (webId) {
            getPods(webId, session)
        }
    }, [])

    useEffect(() => {
        async function getFiles(podUrl) {
            let res = await getAllFilesFromDataset(session, podUrl + 'Test')
            console.log('res ' + res)
            setFiles(res)
        }

        if (webId + pods[0]) {
            getFiles(pods[0])
        }
    }, [])

    if (sessionRequestInProgress) {
        page = (<Skeleton variant="rectangular" width={210} height={60} />)
    }
    else if (session.info.isLoggedIn) {
        webId = session.info.webId
        podUrl = webId.substring(0, (webId.length - 15))
        if (pods != []) {
            page = (
                <div>
                    <Container>
                        <Typography color='black'>{pods[0]}</Typography>
                    </Container>
                </div>
            )
        }

    }
    else if (!session.info.isLoggedIn) {
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