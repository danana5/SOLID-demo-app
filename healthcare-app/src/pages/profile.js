import HomeToolbar from "@/components/toolbar";
import { useSession, CombinedDataProvider, Text } from "@inrupt/solid-ui-react";
import { Typography, Container } from "@mui/material";
import { getProfile, getOrCreateContainer } from "@/utils/pods"
import { useEffect, useState } from "react";
import { getSolidDataset, getThing, getUrlAll } from "@inrupt/solid-client";
import { STORAGE_PREDICATE } from "@/utils/predicates";




export default function ProfilePage() {

    const { session } = useSession();
    const [container, setContainer] = useState();
    const [pods, setPods] = useState();

    useEffect(() => {
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


        })();
    }, [session.info.isLoggedIn]);

    return (
        <div>
            <HomeToolbar></HomeToolbar>
            <Container>
                <Typography color="black">You are Logged In As: {session.info.webId}</Typography>#
                <Typography color="black">Your Pods: {pods}</Typography>
            </Container>
        </div>
    )
}