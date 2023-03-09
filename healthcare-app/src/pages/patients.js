import HomeToolbar from "@/components/toolbar";
import { Card, List, ListItem, ListItemText, ListItemAvatar, Avatar, CardContent, CardHeader, Container, Typography, Button, CardActions } from "@mui/material"
import { useEffect, useState } from "react";
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import Link from 'next/link'
import { getPatients } from "@/utils/pods";
import { useSession } from "@inrupt/solid-ui-react";


export default function Patients() {

    const [patients, setPatients] = useState([])

    const { session } = useSession();


    useEffect(() => {
        async function getPatientsList() {
            setPatients(await getPatients(session))
        }


        getPatientsList()
        console.log(patients)
    }, [])


    return (
        <div>
            <HomeToolbar></HomeToolbar>
            <Container>
                <Card sx={{ mt: 5, maxWidth: 700, ml: 30, mr: 30 }} variant="outlined">
                    <CardHeader title="Your Patients"></CardHeader>
                    <CardContent>
                        <List>
                            {patients.map((value) => {
                                return (
                                    <ListItem
                                        key={value.name}
                                    >
                                        <ListItemAvatar>
                                            <Avatar />
                                        </ListItemAvatar>
                                        <ListItemText primary={value.name} secondary={value.dob} />
                                    </ListItem>
                                )
                            })}
                        </List>
                    </CardContent>
                    <CardActions>
                        <Link href="/newPatient"><Button startIcon={<PersonAddIcon />} color="secondary">Add New Patient</Button></Link>
                        <Button color="secondary">Remove Patient</Button>
                    </CardActions>
                </Card>
            </Container>
        </div>
    )
}