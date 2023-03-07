import { SessionProvider, LoginButton } from "@inrupt/solid-ui-react";
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardHeader from '@mui/material/CardHeader';
import Button from '@mui/material/Button';
import LoginIcon from '@mui/icons-material/Login';
import Typography from '@mui/material/Typography';
import MonitorHeartIcon from '@mui/icons-material/MonitorHeart';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import { Container, Stack } from "@mui/material";
import { useState } from "react";


export default function LoginPage() {

    const [oid, setOid] = useState('https://login.inrupt.com/');

    const loginError = (error) => {
        console.log('LOGIN ERROR' + error)
    }

    const authOptions = {
        clientName: "Solid Health",
    };

    const handleChange = (event) => {
        setOid(event.target.value);
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
                        <Typography >Please select your identity provider and log in to connect your pod.</Typography>
                        <Select
                            value={oid}
                            label="Identity Provider"
                            onChange={handleChange}
                        >
                            <MenuItem value={'https://solidcommunity.net'}>solidcommunity.net</MenuItem>
                            <MenuItem value={'https://login.inrupt.com/'}>login.inrupt.com</MenuItem>
                        </Select>
                    </CardContent>
                    <CardActions>
                        <LoginButton
                            oidcIssuer={oid}
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