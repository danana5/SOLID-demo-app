import HomeToolbar from "@/components/toolbar";
import { Card, List, ListItem, ListItemText, ListItemAvatar, Avatar, CardContent, CardHeader, Container, Typography, Button, CardActions, TextField } from "@mui/material"
import { useState } from "react";
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import { addPatient } from "@/utils/pods"
import { useSession } from "@inrupt/solid-ui-react";
import Link from "next/link";

export default function NewPatient() {

    const { session } = useSession();
    const [patientId, setPatientId] = useState('')

    function handleNewPatient() {
        let res = addPatient(patientId, session)
    }

    function handleChange(evt) {
        const value = evt.target.value;

        setPatientId(value);
        console.log(patientId)
    }

    return (
        <div>
            <HomeToolbar></HomeToolbar>
            <Container>
                <Card sx={{ mt: 5 }} variant="outlined">
                    <CardHeader title="Add New Patient"></CardHeader>
                    <CardContent>
                        <Typography color="text.secondary" variant="subtitle2" sx={{ mb: 2 }}><strong>ATTENTION:</strong> In order to add a patient they must have already added you as their GP.</Typography>
                        <TextField onChange={handleChange} label="Patient's WebID" color="secondary"></TextField>
                    </CardContent>
                    <CardActions>
                        <Button onClick={handleNewPatient} startIcon={<PersonAddIcon />} color="secondary">Add Patient</Button>
                        <Link href="/patients"><Button color="secondary">Go Back</Button></Link>
                    </CardActions>
                </Card>
            </Container>
        </div>
    )
}