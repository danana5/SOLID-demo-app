import HomeToolbar from "@/components/toolbar";
import { Card, List, ListItem, ListItemText, ListItemAvatar, Avatar, CardContent, CardHeader, Container, Typography, Button, CardActions, FormControl, InputLabel, Select, MenuItem, TextField } from "@mui/material"
import { useEffect, useState } from "react";
import Link from 'next/link'
import { useSession } from "@inrupt/solid-ui-react";
import MedicationIcon from '@mui/icons-material/Medication';
import { getAppointments, getPatients, isAccountADoctor, makeAppointment } from "@/utils/pods";

export default function Appointments() {

    const [appointments, setAppointments] = useState([])
    const [newAppointment, setNewAppointment] = useState({})
    const [isDoctor, setDoctor] = useState(false)
    const [patients, setPatients] = useState([])
    const [patient, setPatient] = useState({})

    const { session } = useSession()

    function handleNewAppointment() {
        makeAppointment(patient, newAppointment, session)
    }

    function handleChange(evt) {
        const value = evt.target.value;

        setNewAppointment({
            ...newAppointment,
            [evt.target.name]: value
        });
    }

    function handlePatientSelect(evt) {
        setPatient(evt.target.value)

        let name = patient.name
        setNewAppointment({ ...newAppointment, patient: name })

        console.log(newAppointment)
    }

    useEffect(() => {

        async function getDoctor() {
            setDoctor(await isAccountADoctor(session))
        }

        async function getAppointmentList() {
            setAppointments(await getAppointments(session))
        }

        async function getPatientList() {
            setPatients(await getPatients(session))
        }

        getDoctor()
        getAppointmentList()
        getPatientList()
    }, [])

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
                                            <Avatar >
                                                <MedicationIcon />
                                            </Avatar>
                                        </ListItemAvatar>
                                        <ListItemText primary={value.patient} secondary={<Typography variant="subtitle2" color="text.secondary">{value.dateTime} with {value.doctor}</Typography>} />
                                    </ListItem>
                                )
                            })}
                        </List>
                    </CardContent>
                </Card>
                {isDoctor == true &&
                    <Card sx={{ mt: 5, maxWidth: 700, ml: 30, mr: 30 }} variant="outlined">
                        <CardHeader title="GP Panel"></CardHeader>
                        <CardContent>
                            <FormControl fullWidth>
                                <InputLabel color="secondary" fullWidth>Patient</InputLabel>
                                <Select
                                    label="Select a Patient"
                                    onChange={handlePatientSelect}
                                    sx={{ maxWidth: 200, mb: 1 }}
                                    value={patient}
                                    color="secondary"
                                >
                                    {patients.map((value) => {
                                        return (
                                            <MenuItem value={value}>{value.name}</MenuItem>
                                        )
                                    })
                                    }
                                </Select>
                            </FormControl>
                            <div><TextField onChange={handleChange} label="Doctor's Name" color="secondary" sx={{ mb: 1 }} name="doctor" value={newAppointment.doctor}></TextField></div>
                            <div><TextField onChange={handleChange} label="Date and Time" color="secondary" sx={{ mb: 1 }} name="dateTime" value={newAppointment.dateTime}></TextField></div>
                        </CardContent>
                        <CardActions>
                            <Button onClick={handleNewAppointment} color="secondary">Make Appointment</Button>
                        </CardActions>
                    </Card>
                }
            </Container>
        </div>
    )
}