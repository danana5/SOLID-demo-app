import {
    getSolidDataset,
    getContainedResourceUrlAll,
    getThingAll,
    access,
    getPodUrlAll,
    getThing,
    saveSolidDatasetAt,
    createSolidDataset,
    createContainerAt
} from "@inrupt/solid-client";


export async function getPodUrls(webId, session) {
    const pods = await getPodUrlAll(webId, { fetch: session.fetch });
    return pods
}


export async function checkIfDatasetExists(session, datasetUrl) {
    try {
        const dataset = await getSolidDataset(datasetUrl, { fetch: session.fetch });
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

export async function getAllFilesFromDataset(session, datasetUrl) {
    try {
        const dataset = await getSolidDataset(datasetUrl, { fetch: session.fetch });
        let filesInDataset = await getThingAll(dataset, { fetch: session.fetch })
        return filesInDataset
    } catch (ex) {
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
        console.log(e)
    }
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

    await saveSolidDatasetAt(
        profileUrl,
        createSolidDataset(),
        {
            fetch: session.fetch,
        }
    );

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
}
