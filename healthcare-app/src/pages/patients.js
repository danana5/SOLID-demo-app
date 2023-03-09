import HomeToolbar from "@/components/toolbar";
import { Card, List, ListItem, ListItemText, ListItemAvatar, Avatar, CardContent, CardHeader, Container, Typography, Button, CardActions, IconButton, Select, MenuItem } from "@mui/material"
import { useEffect, useState } from "react";
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import PersonRemoveIcon from '@mui/icons-material/PersonRemove';
import Link from 'next/link'
import { getPatients, removePatient } from "@/utils/pods";
import { useSession } from "@inrupt/solid-ui-react";


export default function Patients() {

    const [patients, setPatients] = useState([])
    const [selectedPatient, setSelectedPatient] = useState()

    const { session } = useSession();

    function handleDelete() {

        const index = patients.indexOf(selectedPatient)

        const patient = patients[index]

        if (index > -1) {
            setPatients(patients.splice(index, 1))
        }

        removePatient(patient.webId, session)
    }

    function handlePatientSelect(evt) {
        setSelectedPatient(evt.target.value)
    }


    useEffect(() => {
        async function getPatientsList() {
            setPatients(await getPatients(session))
        }


        getPatientsList()
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

                                console.log(patients)
                                return (
                                    <ListItem
                                        key={value.name}
                                        secondaryAction={
                                            <Typography color="text.secondary">
                                                {value.webId}
                                            </Typography>
                                        }
                                    >
                                        <ListItemAvatar>
                                            <Avatar />
                                        </ListItemAvatar>
                                        <ListItemText primary={value.name} secondary={value.time} />
                                    </ListItem>
                                )
                            })}
                        </List>
                    </CardContent>
                    <CardActions>
                        <Link href="/newPatient"><Button startIcon={<PersonAddIcon />} color="secondary">Add New Patient</Button></Link>
                        <Select
                            label="Select a Patient"
                            onChange={handlePatientSelect}
                            sx={{ ml: 10, width: 150 }}
                            color="secondary"
                        >
                            {patients.map((value) => {
                                return (
                                    <MenuItem value={value}>{value.name}</MenuItem>
                                )
                            })
                            }
                        </Select>
                        <Button onClick={handleDelete} color="secondary" startIcon={<PersonRemoveIcon />}>Remove Patient</Button>
                    </CardActions>
                </Card>
            </Container>
        </div>
    )
}