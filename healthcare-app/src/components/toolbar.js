import Head from 'next/head'
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import AccountCircle from '@mui/icons-material/AccountCircle';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import LoginIcon from '@mui/icons-material/Login';
import { useSession } from "@inrupt/solid-ui-react";
import Link from 'next/link'

export default function HomeToolbar({ color, title }) {

    const { session, sessionRequestInProgress, logout } = useSession();

    let loggedIn = session.info.isLoggedIn;

    let rightSide;

    if (loggedIn) {
        rightSide = (
            <div>

                <Link href="/profile">
                    <IconButton
                        size="large"
                        aria-label="account of current user"
                        aria-controls="menu-appbar"
                        aria-haspopup="true"
                        color="inherit"
                    >
                        <AccountCircle />
                    </IconButton>
                </Link>
            </div>)
    } else {
        rightSide = (
            <Link href="/login">
                <IconButton
                    size="large"
                    aria-label="account of current user"
                    aria-controls="menu-appbar"
                    aria-haspopup="true"
                    color="inherit"
                >
                    <LoginIcon />
                </IconButton>
            </Link>)
    }

    return (
        <div>
            <AppBar position="static" color={color}>
                <Toolbar>
                    <IconButton
                        size="large"
                        edge="start"
                        color="inherit"
                        aria-label="menu"
                        sx={{ mr: 2 }}
                    >
                        <MenuIcon />
                    </IconButton>
                    <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                        {title || 'Solid Health'}
                    </Typography>
                    {rightSide}
                </Toolbar>
            </AppBar>
        </div>
    );
}