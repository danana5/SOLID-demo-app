import { SessionProvider, LoginButton } from "@inrupt/solid-ui-react";
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardHeader from '@mui/material/CardHeader';
import Button from '@mui/material/Button';
import LoginIcon from '@mui/icons-material/Login';
import Typography from '@mui/material/Typography';
import MonitorHeartIcon from '@mui/icons-material/MonitorHeart';
import { Container, Stack } from "@mui/material";


export default function LoginPage() {

    const loginError = (error) => {
        console.log('LOGIN ERROR' + error)
    }

    const authOptions = {
        clientName: "Solid Health",
    };

    return (
        <SessionProvider sessionId="somes-id">
            <Container>
                <Stack direction="row">
                    <MonitorHeartIcon fontSize="large" sx={{
                        mt: 5,
                        ml: 50,
                        mr: 1
                    }} color="primary" />
                    <Typography color="primary" variant="h4"
                        noWrap sx={{
                            mt: 5,
                            mr: 50, fontFamily: 'monospace',
                            fontWeight: 700,
                            letterSpacing: '.3rem',
                            textDecoration: 'none',
                        }}>Solid Health</Typography>
                </Stack>

                <Card sx={{ minWidth: 500, mr: 50, ml: 50, width: 400, mt: 2 }} variant="outlined">
                    <CardHeader title="Connect Your Pod">
                    </CardHeader>
                    <CardContent>
                        <Typography >Please click the button below in order to connect your Solid Pod.</Typography>
                    </CardContent>
                    <CardActions>
                        <LoginButton
                            oidcIssuer="https://login.inrupt.com/"
                            onError={loginError}
                            authOptions={authOptions}
                            redirectUrl="http://localhost:3000/profile"
                        >
                            <Button startIcon={<LoginIcon />}>Log In With Solid</Button>
                        </LoginButton>
                    </CardActions>
                </Card >
            </Container>
        </SessionProvider>
    );
}