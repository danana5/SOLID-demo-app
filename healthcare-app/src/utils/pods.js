import {
    getSolidDataset,
    getContainedResourceUrlAll,
    getThingAll,
    access,
    getPodUrlAll
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
