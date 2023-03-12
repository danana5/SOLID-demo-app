import HomeToolbar from "@/components/toolbar";
import { Card, List, ListItem, ListItemText, ListItemAvatar, Avatar, CardContent, CardHeader, Container, Typography, Button, CardActions } from "@mui/material"
import { useState, useEffect } from "react";
import Link from 'next/link'
import { useSession } from "@inrupt/solid-ui-react";
import { getPrescriptions, isAccountADoctor } from "@/utils/pods";

export default function Prescriptions() {

    const [prescriptions, setPrescriptions] = useState([])
    const [isDoctor, setDoctor] = useState(false)

    const { session } = useSession();

    useEffect(() => {
        async function getPrescriptionsList() {
            setPrescriptions(await getPrescriptions(session))
        }

        async function getDoctor() {
            setDoctor(await isAccountADoctor(session))
        }

        getDoctor()
        getPrescriptionsList()
    }, [])
    return (
        <div>
            <HomeToolbar></HomeToolbar>
            <Container>
                <Card sx={{ mt: 5 }} variant="outlined">
                    <CardHeader title="Your Prescriptions"></CardHeader>
                    <CardContent>
                        <List>
                            {prescriptions.map((value) => {
                                return (
                                    <ListItem
                                        key={value}
                                    >
                                        <ListItemAvatar>
                                            <Avatar />
                                        </ListItemAvatar>
                                        <ListItemText primary={value.dateIssued} secondary={value.drug} />
                                    </ListItem>
                                )
                            })}
                        </List>
                    </CardContent>
                </Card>
                {isDoctor == true &&
                    <Card sx={{ mt: 5 }} variant="outlined">
                        <CardHeader title="GP: Create Prescription"></CardHeader>
                        <CardContent>
                            <Link href="/newPrescription"><Button color="secondary">Create Prescription For Patient</Button></Link>
                        </CardContent>
                    </Card>
                }
            </Container>
        </div >
    )
}