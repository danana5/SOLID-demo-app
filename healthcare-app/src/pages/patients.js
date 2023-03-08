import HomeToolbar from "@/components/toolbar";
import { Card, List, ListItem, ListItemText, ListItemAvatar, Avatar, CardContent, CardHeader, Container, Typography, Button, CardActions } from "@mui/material"
import { useEffect, useState } from "react";
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import Link from 'next/link'


export default function Patients() {

    const [patients, setPatients] = useState([
        { name: 'Daniel Grace', dob: '27/01/2000', webId: 'https://id.inrupt.com/danana' },
        { name: 'Joe Grace', dob: '15/09/2003', webId: 'https://id.inrupt.com/joegrace' },])


    // useEffect(() => {

    //     async function getPatients() {

    //     }

    //     getPatients()
    // }, [])


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
                                        key={value}
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
                    </CardActions>
                </Card>
            </Container>
        </div>
    )
}