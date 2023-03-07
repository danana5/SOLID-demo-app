import HomeToolbar from "@/components/toolbar";
import { Card, List, ListItem, ListItemText, ListItemAvatar, Avatar, CardContent, CardHeader, Container, Typography } from "@mui/material"
import { useEffect } from "react";


export default function Patients() {

    const [patients, getPatients] = useState({})


    function generateList() {

    }

    useEffect(() => {

        async function getPatients() {

        }

        getPatients()
    }, [])

    return (
        <div>
            <HomeToolbar></HomeToolbar>
            <Container>
                <Card>
                    <CardHeader></CardHeader>
                    <CardContent>
                        <List>

                        </List>
                    </CardContent>
                </Card>
            </Container>
        </div>
    )
}