import HomeToolbar from "@/components/toolbar";
import { Card, List, ListItem, ListItemText, ListItemAvatar, Avatar, CardContent, CardHeader, Container, Typography, Button, CardActions, TextField, Select, MenuItem, FormControl, InputLabel } from "@mui/material"
import { useState, useEffect } from "react";
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import { useSession } from "@inrupt/solid-ui-react";
import Link from "next/link";
import { getPatients, addPrescription } from "@/utils/pods";

export default function NewPrescription() {

    const { session } = useSession();
    const [patient, setPatient] = useState({})
    const [patients, setPatients] = useState([])
    const [prescription, setPrescription] = useState({})

    function handleNewPrescription() {

        setPrescription({ ...prescription, patient: patient.name })
        addPrescription(prescription, patient.webId, session)
    }

    function handleChange(evt) {
        const value = evt.target.value;

        setPrescription({
            ...prescription,
            [evt.target.name]: value
        });
    }

    function handlePatientSelect(evt) {
        setPatient(evt.target.value)
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
                <Card sx={{ mt: 5 }} variant="outlined">
                    <CardHeader title="Create New Prescription"></CardHeader>
                    <CardContent>
                        <FormControl fullWidth>
                            <InputLabel color="secondary">Patient</InputLabel>
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
                        <div><TextField onChange={handleChange} label="Doctor's Name" color="secondary" sx={{ mb: 1 }} name="doctor"></TextField></div>
                        <div><TextField onChange={handleChange} label="Drug" color="secondary" sx={{ mb: 1 }} name="drug"></TextField></div>
                        <div><TextField onChange={handleChange} label="Dosage" color="secondary" sx={{ mb: 1 }} name="dosage"></TextField></div>
                        <div><TextField onChange={handleChange} label="Schedule" color="secondary" sx={{ mb: 1 }} name="schedule"></TextField></div>
                        <div><TextField onChange={handleChange} label="Date Issued" color="secondary" sx={{ mb: 1 }} name="dateIssued"></TextField></div>
                    </CardContent>
                    <CardActions>
                        <Button onClick={handleNewPrescription} startIcon={<PersonAddIcon />} color="secondary">Create Prescription</Button>
                        <Link href="/prescriptions"><Button color="secondary">Go Back</Button></Link>
                    </CardActions>
                </Card>
            </Container>
        </div>
    )
}