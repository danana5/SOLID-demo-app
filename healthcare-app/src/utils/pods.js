import {
    getSolidDataset,
    getContainedResourceUrlAll,
    getThingAll,
    access,
    getPodUrlAll,
    getThing,
    saveSolidDatasetAt,
    createSolidDataset,
    createContainerAt,
    buildThing,
    createThing,
    setThing,
    setBoolean,
    getUrlAll,
    getBoolean
} from "@inrupt/solid-client";
import { PROFILE, STORAGE_PREDICATE } from "./predicates";


export async function getPodUrls(webId, session) {
    const pods = await getPodUrlAll(webId, { fetch: session.fetch });
    return pods
}

export async function checkIfDatasetExists(session, datasetUrl) {
    try {
        await getSolidDataset(datasetUrl, { fetch: session.fetch });
        return true
    }
    catch (ex) {
        if (ex.message.includes("Fetching the Resource at [" + datasetUrl + "] failed: [404]"))  //Dataset does not exist
        {
            return false
        }
        else if (ex.message.includes("Fetching the Resource at [" + datasetUrl + "] failed: [403]"))  //Dataset may exist but user not authorized
        {
            return false
        }
    }
}

export async function getProfile(session) {
    try {
        const dataset = await getSolidDataset(session.info.webId)
        const profileThing = getThing(dataset, session.info.webId)

        return profileThing
    } catch (e) {
        console.log("ERROR")
    }
}

export async function isAccountADoctor(session) {
    try {
        const profileThing = await getProfile(session)

        const podsUrls = getUrlAll(
            profileThing,
            STORAGE_PREDICATE
        );
        const pod = podsUrls[0]
        const containerUri = `${pod}Solid-Health/`

        const dataset = await getSolidDataset(`${containerUri}profile.ttl`, { fetch: session.fetch });

        let thing = await getThing(dataset, `${containerUri}profile.ttl#profileData`)

        return await getBoolean(thing, PROFILE.DOCTOR)
    } catch (e) {
        console.log(e)
    }
}

export async function getProfileData(containerUrl, session) {
    const dataset = await getSolidDataset(`${containerUrl}profile.ttl`, { fetch: session.fetch });

    return await getThing(dataset, `${containerUrl}profile.ttl#profileData`)
}

export async function getOrCreateContainer(containerUri, session) {
    const indexUrl = containerUri;
    try {
        const appFolder = await getSolidDataset(indexUrl, { fetch: session.fetch });
        return appFolder;
    } catch (error) {
        if (error.statusCode === 404) {
            const appFolder = await createContainerAt(
                indexUrl,
                { fetch: session.fetch }
            );
            await createTurtleFiles(containerUri, session)
            return appFolder;
        }
    }
}

async function createTurtleFiles(containerUri, session) {
    const indexUrl = `${containerUri}index.ttl`
    const profileUrl = `${containerUri}profile.ttl`
    const appointmentsUrl = `${containerUri}appointments.ttl`
    const prescriptionsUrl = `${containerUri}prescriptions.ttl`

    await saveSolidDatasetAt(
        indexUrl,
        createSolidDataset(),
        {
            fetch: session.fetch
        }
    );

    const profileDataset = await saveSolidDatasetAt(
        profileUrl,
        createSolidDataset(),
        {
            fetch: session.fetch,
        }
    )

    await saveSolidDatasetAt(
        appointmentsUrl,
        createSolidDataset(),
        {
            fetch: session.fetch,
        }
    );

    await saveSolidDatasetAt(
        prescriptionsUrl,
        createSolidDataset(),
        {
            fetch: session.fetch,
        }
    );

    await createProfileData(profileDataset, session, profileUrl)

    console.log("TURLTE FILES ALL CREATED!")
}

export async function createProfileData(profileDataset, session, url) {

    const date = new Date().toUTCString()
    const profileData = buildThing(createThing({ name: 'profileData' }))
        .addStringNoLocale(PROFILE.DATE_CREATED, date)
        .addStringNoLocale(PROFILE.ADDRESS, '')
        .addStringNoLocale(PROFILE.GIVEN_NAME, '')
        .addStringNoLocale(PROFILE.FAMILY_NAME, '')
        .addStringNoLocale(PROFILE.EMAIL, '')
        .addStringNoLocale(PROFILE.TELEPHONE, '')
        .addBoolean(PROFILE.DOCTOR, false)
        .build()

    const dataset = await setThing(profileDataset, profileData)

    await saveSolidDatasetAt(url, dataset, { fetch: session.fetch })
}

export async function updateProfileData(profile, containerUrl, session) {
    try {
        const dataset = await getSolidDataset(`${containerUrl}profile.ttl`, { fetch: session.fetch });
        const profileData = buildThing(createThing({ name: 'profileData' }))
            .addStringNoLocale(PROFILE.DATE_CREATED, profile.dateCreated)
            .addStringNoLocale(PROFILE.ADDRESS, profile.address)
            .addStringNoLocale(PROFILE.GIVEN_NAME, profile.givenName)
            .addStringNoLocale(PROFILE.FAMILY_NAME, profile.familyName)
            .addStringNoLocale(PROFILE.EMAIL, profile.email)
            .addStringNoLocale(PROFILE.TELEPHONE, profile.telephone)
            .addBoolean(PROFILE.DOCTOR, profile.doctor)
            .build()

        const thing = await setThing(dataset, profileData)

        await saveSolidDatasetAt(`${containerUrl}profile.ttl`, thing, { fetch: session.fetch })
    } catch (e) {
        console.log(e)
    }
}

export async function getProfilePhoto(containerUrl, session) {
    try {
        const dataset = await getSolidDataset(`${containerUrl}`, { fetch: session.fetch });

        const things = getThingAll(dataset, { fetch: session.fetch })

        console.log(things)
    }
    catch (e) {
        console.log(e)
    }
}

export async function switchToGPAccount(session) {

    if (session.info.isLoggedIn) {
        const profileThing = await getProfile(session)

        const podsUrls = getUrlAll(
            profileThing,
            STORAGE_PREDICATE
        );
        const pod = podsUrls[0]
        const containerUri = `${pod}Solid-Health/`

        const dataset = await getSolidDataset(`${containerUri}profile.ttl`, { fetch: session.fetch });

        let thing = await getThing(dataset, `${containerUri}profile.ttl#profileData`)

        thing = await setBoolean(thing, PROFILE.DOCTOR, true)

        thing = await setThing(dataset, thing)

        await saveSolidDatasetAt(`${containerUri}profile.ttl`, thing, { fetch: session.fetch })
    }
}