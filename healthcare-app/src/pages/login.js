import { SessionProvider, LoginButton } from "@inrupt/solid-ui-react";
import Head from 'next/head'
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardHeader from '@mui/material/CardHeader';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { ThemeProvider } from '@mui/system';
import { createTheme, responsiveFontSizes } from '@mui/material/styles';


let theme = createTheme({
    typography: {
        fontFamily: 'Roboto',
    }
});
theme = responsiveFontSizes(theme);


export default function LoginPage() {

    const loginError = (error) => {
        console.log('LOGIN ERROR' + error)
    }

    return (
        <ThemeProvider theme={theme}>
            <Head>
                <title>Login Page</title>
                <meta name="viewport" content="width=device-width, initial-scale=1" />
                <link rel="icon" href="/favicon.ico" />
                <link
                    rel="stylesheet"
                    href="https://fonts.googleapis.com/css?family=Roboto:300,400,500,700&display=swap"
                />
            </Head>
            <SessionProvider sessionId="somes-id">
                <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                }}>
                    <Card sx={{ minWidth: 500, mt: 50 }} variant="outlined">
                        <CardHeader title="Connect Your Pod">
                        </CardHeader>
                        <CardContent>
                            <Typography >Please click the button below in order to connect your Solid Pod.</Typography>
                        </CardContent>
                        <CardActions>
                            <LoginButton
                                oidcIssuer="https://login.inrupt.com/"
                                onError={loginError}
                                redirectUrl="http://localhost:3000/home"
                            >
                                <Button>Log In With Solid</Button>
                            </LoginButton>
                        </CardActions>
                    </Card >
                </div>
            </SessionProvider>
        </ThemeProvider>
    );
}