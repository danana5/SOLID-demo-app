import { SessionProvider, LoginButton } from "@inrupt/solid-ui-react";
import Head from 'next/head'
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

export default function LoginPage() {

    return (
        <div>
            <Head>
                <title>Login Page</title>
                <meta name="viewport" content="width=device-width, initial-scale=1" />
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <SessionProvider sessionId="somes-id">
                <div>
                    <Card sx={{ maxWidth: 275, margin: 50 }}>
                        <CardActions>
                            <LoginButton
                                oidcIssuer="https://inrupt.net"
                                redirectUrl="https://localhost:3000/home"
                            />
                        </CardActions>
                    </Card >
                </div>
            </SessionProvider>
        </div>
    );
}