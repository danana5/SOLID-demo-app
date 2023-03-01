import { SessionProvider, LoginButton } from "@inrupt/solid-ui-react";
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardHeader from '@mui/material/CardHeader';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';


export default function LoginPage() {

    const loginError = (error) => {
        console.log('LOGIN ERROR' + error)
    }

    const authOptions = {
        clientName: "Solid Health",
    };

    return (
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
                            authOptions={authOptions}
                            redirectUrl="http://localhost:3000/profile"
                        >
                            <Button>Log In With Solid</Button>
                        </LoginButton>
                    </CardActions>
                </Card >
            </div>
        </SessionProvider>
    );
}