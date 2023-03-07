import { useSession, CombinedDataProvider, Text } from "@inrupt/solid-ui-react";
import HomeToolbar from '../components/toolbar'
import Skeleton from '@mui/material/Skeleton';
import { Typography, Container, Card, TextField, Button, CardActions, CardContent, CardHeader, Avatar, Stack } from "@mui/material";
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
                    <Typography color="black" variant="h5" sx={{ mt: 5, ml: 50, mr: 50 }}>Welcome To Solid Health</Typography>
                    <Stack direction="row" spacing={2} sx={{ mt: 5, ml: 50, mr: 50 }}>
                        <Link href="/appointments">
                            <Card variant="outlined" sx={{}}>
                                <CardContent>
                                    <Typography variant="h6">Appointments</Typography>
                                </CardContent>
                            </Card>
                        </Link>
                        <Link href="/prescriptions">
                            <Card variant="outlined">
                                <CardContent>
                                    <Typography variant="h6">Prescriptions</Typography>
                                </CardContent>
                            </Card>
                        </Link>
                    </Stack>

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
            <Card sx={{ minWidth: 500, mt: 5 }} variant="outlined">
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