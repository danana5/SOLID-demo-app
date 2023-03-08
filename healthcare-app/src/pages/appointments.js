import HomeToolbar from "@/components/toolbar";
import { Card, List, ListItem, ListItemText, ListItemAvatar, Avatar, CardContent, CardHeader, Container, Typography, Button, CardActions } from "@mui/material"
import { useState } from "react";
import Link from 'next/link'

export default function Appointments() {

    const [appointments, setAppointments] = useState([{ time: new Date().toISOString(), doctor: 'Daniel Grace', patient: 'Joseph Grace' }])


    return (
        <div>
            <HomeToolbar></HomeToolbar>
            <Container>
                <Card sx={{ mt: 5, maxWidth: 700, ml: 30, mr: 30 }} variant="outlined">
                    <CardHeader title="Your Appointments"></CardHeader>
                    <CardContent>
                        <List>
                            {appointments.map((value) => {
                                return (
                                    <ListItem
                                        key={value}
                                    >
                                        <ListItemAvatar>
                                            <Avatar />
                                        </ListItemAvatar>
                                        <ListItemText primary={value.patient} secondary={value.time} />
                                    </ListItem>
                                )
                            })}
                        </List>
                    </CardContent>
                    <CardActions>
                        <Link href="/newAppointment"><Button color="secondary">Create Appointment</Button></Link>
                    </CardActions>
                </Card>
            </Container>
        </div>
    )
}