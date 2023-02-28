import HomeToolbar from "@/components/toolbar";
import { useSession, CombinedDataProvider, Text } from "@inrupt/solid-ui-react";
import { Typography, Container, Card, TextField, Button, CardActions } from "@mui/material";
import { getProfile, getOrCreateContainer, getProfileData } from "@/utils/pods"
import { useEffect, useState } from "react";
import { getSolidDataset, getThing, getUrlAll, getStringNoLocale } from "@inrupt/solid-client";
import { STORAGE_PREDICATE, PROFILE } from "@/utils/predicates";


export default function ProfilePage() {

    const { session } = useSession();
    const [container, setContainer] = useState()
    const [edit, setEdit] = useState(false)
    const [profile, setProfile] = useState({})
    const [pods, setPods] = useState();


    useEffect(() => {

        // Profile data comes in as a thing and this function changes it into an object for displaying
        async function assignDataToProfile(profileData) {
            const res = {}

            res.givenName = await getStringNoLocale(profileData, PROFILE.GIVEN_NAME)
            res.familyName = await getStringNoLocale(profileData, PROFILE.FAMILY_NAME)
            res.dateCreated = await getStringNoLocale(profileData, PROFILE.DATE_CREATED)
            res.email = await getStringNoLocale(profileData, PROFILE.EMAIL)
            res.telephone = await getStringNoLocale(profileData, PROFILE.TELEPHONE)
            res.address = await getStringNoLocale(profileData, PROFILE.ADDRESS)
            setProfile(res)

            console.log(profile)
        }

        if (!session.info.isLoggedIn) return;
        (async () => {
            const profileThing = await getProfile(session)
            const podsUrls = getUrlAll(
                profileThing,
                STORAGE_PREDICATE
            );
            setPods(podsUrls)
            const pod = podsUrls[0]
            const containerUri = `${pod}Solid-Health/`


            setContainer(await getOrCreateContainer(containerUri, session))
            await assignDataToProfile(await getProfileData(containerUri, session))
        })();
    }, [session.info.isLoggedIn]);

    // useEffect(() => {

    // }, [edit])

    function handleEdit() {
        console.log("Edit")
        setEdit(!edit)
    }

    return (
        <div>
            <HomeToolbar></HomeToolbar>
            <Container>
                <Card>
                    <TextField variant="outlined" value={profile.dateCreated} label="Date Created" inputProps={{ readOnly: !edit }}></TextField>
                    <CardActions><Button onClick={handleEdit}>Toggle Edit</Button></CardActions>
                </Card>
            </Container>
        </div >
    )
}