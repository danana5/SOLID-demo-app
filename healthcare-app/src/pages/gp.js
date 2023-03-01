import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardHeader from '@mui/material/CardHeader';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Link from 'next/link'
import { switchToGPAccount } from '@/utils/pods';
import { useSession } from "@inrupt/solid-ui-react";
import { useEffect } from "react";


export default function gpApplicationPage() {

    const { session } = useSession()

    const clicked = () => {
        console.log('clicked')
        switchToGPAccount(session)
    }

    return (
        <div style={{
            display: 'flex',
            justifyContent: 'center',
        }}>
            <Card sx={{ minWidth: 500, mt: 50 }} variant="outlined">
                <CardHeader title="Are You A GP?">
                </CardHeader>
                <CardContent>
                    <Typography >Please click the button below to gain Access to a GP account.</Typography>
                </CardContent>
                <CardActions>
                    <Button onClick={clicked}>Switch to GP Account</Button>
                    <Link href="/home"><Button>Go Back</Button></Link>
                </CardActions>
            </Card >
        </div >
    );
}