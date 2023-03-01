import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import AccountCircle from '@mui/icons-material/AccountCircle';
import Tooltip from '@mui/material/Tooltip';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import Button from '@mui/material/Button';
import MonitorHeartIcon from '@mui/icons-material/MonitorHeart';
import LoginIcon from '@mui/icons-material/Login';
import { useSession } from "@inrupt/solid-ui-react";
import Link from 'next/link'

export default function HomeToolbar({ doctor }) {

    const { session, sessionRequestInProgress, logout } = useSession();

    let loggedIn = session.info.isLoggedIn;

    let rightSide;

    if (loggedIn) {
        rightSide = (
            <div>
                <Box>
                    <Tooltip title="Profile Page">
                        <Link href="/profile">
                            <IconButton
                                aria-label="account of current user"
                                aria-haspopup="true"
                                color="inherit">
                                <AccountCircle />
                            </IconButton>
                        </Link>
                    </Tooltip>
                </Box>
            </div>)
    } else {
        rightSide = (
            <Link href="/login" sx={{ flexGrow: 1 }}>
                <IconButton
                    size="large"
                    aria-label="account of current user"
                    aria-controls="menu-appbar"
                    edge="end"
                    aria-haspopup="true"
                    color="inherit"
                >
                    <LoginIcon />
                </IconButton>
            </Link>)
    }

    function getColor() {
        if (doctor) {
            return 'secondary'
        } else {
            return 'primary'
        }
    }

    return (
        <div>
            <AppBar position="static" color={getColor()}>
                <Toolbar>
                    <MonitorHeartIcon />
                    <Typography
                        variant="h6"
                        noWrap
                        sx={{
                            ml: 2, flexGrow: 1,
                            fontFamily: 'monospace',
                            fontWeight: 700,
                            letterSpacing: '.3rem',
                            color: 'inherit',
                            textDecoration: 'none',
                        }}
                    >
                        <Link href="/home">Solid Health</Link>
                    </Typography>
                    <Button
                        sx={{ my: 2, color: 'white', display: 'block', display: { xs: 'none', md: 'flex' }, maxWidth: 150 }}
                    >
                        Appointments
                    </Button>
                    <Button
                        sx={{ my: 2, color: 'white', display: 'block', display: { xs: 'none', md: 'flex' }, maxWidth: 150, mr: 5 }}
                    >
                        Prescriptions
                    </Button>
                    {rightSide}
                </Toolbar>
            </AppBar>
        </div >
    );
}