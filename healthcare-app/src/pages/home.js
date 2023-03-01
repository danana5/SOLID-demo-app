import { useSession, CombinedDataProvider, Text } from "@inrupt/solid-ui-react";
import HomeToolbar from '../components/toolbar'
import Skeleton from '@mui/material/Skeleton';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import { Card, CardContent } from '@mui/material'
import Link from 'next/link'
import { useEffect, useState } from 'react';


export default function HomePage() {

    const [pods, setPods] = useState([])
    const [files, setFiles] = useState([])
    let page

    const { session, sessionRequestInProgress, logout } = useSession();


    if (sessionRequestInProgress) {
        page = (<Skeleton variant="rectangular" width={210} height={60} />)
    }
    else if (session.info.isLoggedIn) {

        if (pods != []) {
            page = (
                <div>
                    <Container>
                        <Card></Card>
                        <Card></Card>
                    </Container>
                </div>
            )
        }

    }
    else if (!session.info.isLoggedIn) {
        page = (<div style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
        }}>
            <Card sx={{ minWidth: 500, mt: 50 }} variant="outlined">
                <CardContent>
                    <Typography color="black" variant='h4'>You Are Not Logged In</Typography>
                    <Typography color="text.secondary" variant="subtitle1"><Link href="/login">Click here to Log In</Link></Typography>
                </CardContent>
            </Card>
        </div>)
    }

    return (
        <div>
            <HomeToolbar color='primary' />
            <Container>
                {page}
            </Container>
        </div>
    );
}