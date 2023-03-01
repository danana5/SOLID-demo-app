import HomeToolbar from "@/components/toolbar";
import { useSession, CombinedDataProvider, Text } from "@inrupt/solid-ui-react";
import { Typography, Container, Card, TextField, Button, CardActions, CardContent, CardHeader, Avatar } from "@mui/material";
import { getProfile, getOrCreateContainer, getProfileData, updateProfileData } from "@/utils/pods"
import { useEffect, useState } from "react";
import { getSolidDataset, getThing, getUrlAll, getStringNoLocale } from "@inrupt/solid-client";
import EditIcon from '@mui/icons-material/Edit';
import SaveIcon from '@mui/icons-material/Save';
import CancelIcon from '@mui/icons-material/Cancel';
import { STORAGE_PREDICATE, PROFILE } from "@/utils/predicates";


export default function ProfilePage() {

    const { session } = useSession();
    const [container, setContainer] = useState()
    const [containerUrl, setContainerUrl] = useState('')
    const [edit, setEdit] = useState(false)
    const [profile, setProfile] = useState({})
    const [pods, setPods] = useState()
    const [temp, setTemp] = useState()
    const [loading, setLoading] = useState()
    let profilePage



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
            setContainerUrl(`${pod}Solid-Health/`)
            console.log(containerUrl)

            setContainer(await getOrCreateContainer(containerUri, session))
            await assignDataToProfile(await getProfileData(containerUri, session))
        })();
    }, [session.info.isLoggedIn]);

    function handleEdit() {
        setTemp(profile)
        setEdit(!edit)

    }

    function getIntials() {
        if (profile.givenName && profile.familyName) {
            let initials = Array.from(profile.givenName)[0] + Array.from(profile.familyName)[0];
            return initials
        }
    }

    function handleSave() {
        setLoading(true)
        updateProfileData(temp, containerUrl, session)
        setProfile(temp)
        setLoading(false)
        setEdit(false)
    }

    function handleChange(evt) {
        const value = evt.target.value;

        setTemp({
            ...temp,
            [evt.target.name]: value
        });

        console.log(temp)
    }

    if (!edit) {
        profilePage = (
            <div>
                <CardHeader title="Your Profile"></CardHeader>
                <CardContent>
                    <Avatar variant="rounded" sx={{ width: 80, height: 80, position: "center", mb: 3 }} >{getIntials()}</Avatar>
                    <Typography>Name: {profile.givenName + ' ' + profile.familyName}</Typography>
                    <Typography>Address: {profile.address}</Typography>
                    <Typography>Contact Number: {profile.telephone}</Typography>
                    <Typography>Email Address: {profile.email}</Typography>
                    <Typography>You've Been a Member Since: {new Date(profile.dateCreated).toDateString()}</Typography>
                </CardContent>
                <CardActions><Button onClick={handleEdit} startIcon={<EditIcon />} >Edit</Button></CardActions>
            </div>

        )
    }
    else {
        profilePage = (
            <div>
                <CardHeader title="Edit Your Profile"></CardHeader>
                <CardContent>
                    <Avatar variant="rounded" sx={{ width: 80, height: 80, position: "center", mb: 3 }} >{getIntials()}</Avatar>
                    <div><TextField value={temp.givenName} onChange={handleChange} name="givenName" sx={{ mb: 1 }} label="First Name"></TextField></div>
                    <div><TextField value={temp.familyName} onChange={handleChange} name="familyName" sx={{ mb: 1 }} label="Surname"></TextField></div>
                    <div><TextField value={temp.address} onChange={handleChange} name="address" sx={{ mb: 1 }} label="Address"></TextField></div>
                    <div><TextField value={temp.telephone} onChange={handleChange} name="telephone" sx={{ mb: 1 }} label="Telephone"></TextField></div>
                    <div><TextField value={temp.email} onChange={handleChange} name="email" sx={{ mb: 1 }} label="Email"></TextField></div>
                </CardContent >
                <CardActions>
                    <Button onClick={handleEdit} startIcon={<CancelIcon />} color="secondary">Cancel</Button>
                    <Button onClick={handleSave} startIcon={<SaveIcon />} color="success">Save</Button>
                </CardActions>
            </div >
        )
    }

    return (
        <div>
            <HomeToolbar></HomeToolbar>
            <Container>
                <Card sx={{ mt: 5 }} variant="outlined">{profilePage}</Card>
            </Container>
        </div >
    )
}