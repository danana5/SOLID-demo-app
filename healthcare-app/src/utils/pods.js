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
    getBoolean,
    hasResourceAcl,
    getResourceInfoWithAcl,
    createAcl,
    getResourceAcl,
    hasFallbackAcl,
    setAgentResourceAccess,
    hasAcl,
    hasAccessibleAcl,
    saveAclFor,
    createAclFromFallbackAcl,
    setAgentDefaultAccess,
    universalAccess,
    getAgentDefaultAccess,
    getStringNoLocale,
    removeThing,
    getDatetime
} from "@inrupt/solid-client";
import { PROFILE, STORAGE_PREDICATE, PATIENT, PRESCRIPTION, APPOINTMENT } from "./predicates";

const permissionsAll = { read: true, write: true, append: true, control: true, }
const permissionsForPatient = { read: true, write: true, append: false, control: false }
const readOnlyPermissions = { read: true, write: false, append: false, control: false }


async function getContainerUri(session) {
    const profileThing = await getProfile(session)

    const podsUrls = getUrlAll(
        profileThing,
        STORAGE_PREDICATE
    );
    const pod = podsUrls[0]
    const containerUri = `${pod}Solid-Health/`

    return containerUri
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
        const profileThing = await getThing(dataset, session.info.webId)

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
        .addStringNoLocale(PROFILE.BIRTH_DATE, '')
        .addStringNoLocale(PROFILE.DOCTORS_ID, '')
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
            .addStringNoLocale(PROFILE.BIRTH_DATE, profile.birthDate)
            .addStringNoLocale(PROFILE.DOCTORS_ID, profile.doctorsId)
            .addBoolean(PROFILE.DOCTOR, profile.doctor)
            .build()

        const thing = await setThing(dataset, profileData)

        await saveSolidDatasetAt(`${containerUrl}profile.ttl`, thing, { fetch: session.fetch })
    } catch (e) {
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

export async function addPatient(webId, session) {
    // ADD PATIENT AND CHECK FOR ACCESS

    try {
        const dataset = await getSolidDataset(webId)
        const profileThing = getThing(dataset, webId)
        const podsUrls = getUrlAll(
            profileThing,
            STORAGE_PREDICATE
        );
        const pod = podsUrls[0]
        const profileUri = `${pod}Solid-Health/profile.ttl`

        const profile = await getSolidDataset(profileUri, { fetch: session.fetch })

        let thing = getThing(profile, profileUri + '#profileData')

        let patientGivenName = getStringNoLocale(thing, PROFILE.GIVEN_NAME)
        let patientFamilyName = getStringNoLocale(thing, PROFILE.FAMILY_NAME)
        let patientBirthDate = getStringNoLocale(thing, PROFILE.BIRTH_DATE)
        let gp = getStringNoLocale(thing, PROFILE.DOCTORS_ID)

        if (gp == session.info.webId) {
            const containerUrl = await getContainerUri(session)

            let index = await getSolidDataset(containerUrl + 'index.ttl', { fetch: session.fetch })
            let patientName = patientGivenName + ' ' + patientFamilyName

            let patient = buildThing(createThing({ name: patientName }))
                .addStringNoLocale(PATIENT.BIRTH_DATE, patientBirthDate)
                .addStringNoLocale(PATIENT.FAMILY_NAME, patientFamilyName)
                .addStringNoLocale(PATIENT.GIVEN_NAME, patientGivenName)
                .addStringNoLocale(PATIENT.WEB_ID, webId)
                .build()

            index = setThing(index, patient)
            await saveSolidDatasetAt(containerUrl + 'index.ttl', index, { fetch: session.fetch })

            return true
        }
        else {
            return false
        }

        return true
    } catch (e) {
        return false
    }
}

export async function testAccess(session) {

    const dataset = await getSolidDataset('https://storage.inrupt.com/8dee44e6-2bf3-4965-a783-998d96a9bd49/Solid-Health/profile.ttl', { fetch: session.fetch })

    const thing = getThing(dataset, 'https://storage.inrupt.com/8dee44e6-2bf3-4965-a783-998d96a9bd49/Solid-Health/profile.ttl#profileData')

    let appointmentDataset = await getSolidDataset('https://storage.inrupt.com/8dee44e6-2bf3-4965-a783-998d96a9bd49/Solid-Health/appointments.ttl', { fetch: session.fetch })

    appointmentDataset = setThing(appointmentDataset, thing)

    await saveSolidDatasetAt('https://storage.inrupt.com/8dee44e6-2bf3-4965-a783-998d96a9bd49/Solid-Health/appointments.ttl', appointmentDataset, { fetch: session.fetch })

}

export async function addGP(webId, session) {
    // GIVE GP ACCESS TO APPOINTMENTS + PRESCRIPTIONS + PROFILE

    const containerUri = await getContainerUri(session)
    const profileUri = containerUri + 'profile.ttl'
    const appointmentsUri = containerUri + 'appointments.ttl'
    const prescriptionsUri = containerUri + 'prescriptions.ttl'


    universalAccess.setAgentAccess(profileUri, webId, readOnlyPermissions, { fetch: session.fetch })
    universalAccess.setAgentAccess(appointmentsUri, webId, permissionsAll, { fetch: session.fetch })
    universalAccess.setAgentAccess(prescriptionsUri, webId, permissionsAll, { fetch: session.fetch })

    console.log('ACCESS GRANTED')
}

export async function removePatient(webId, session) {
    // REMOVE PATIENT FROM GP LIST
    console.log('delete ' + webId)

    const containerUrl = await getContainerUri(session)

    let index = await getSolidDataset(containerUrl + 'index.ttl', { fetch: session.fetch })

    const patientThings = await getThingAll(index)

    for (let thing of patientThings) {
        let id = getStringNoLocale(thing, PATIENT.WEB_ID)

        if (id == webId) {
            index = removeThing(index, thing)
        }
    }

    await saveSolidDatasetAt(containerUrl + 'index.ttl', index, { fetch: session.fetch })
}

export async function removeDoctor(webId, session) {
    // REMOVE DOCTOR AND THEIR PERMISSIONS


}

export async function getPatients(session) {
    // RETRIEVE A DOCTORS PATIENTS LIST FROM index.ttl

    let patients = []
    const containerUrl = await getContainerUri(session)

    const index = await getSolidDataset(containerUrl + 'index.ttl', { fetch: session.fetch })

    const patientThings = await getThingAll(index)

    for (let thing of patientThings) {
        let patient = {}
        patient.name = getStringNoLocale(thing, PATIENT.GIVEN_NAME) + ' ' + getStringNoLocale(thing, PATIENT.FAMILY_NAME)
        patient.dob = getStringNoLocale(thing, PATIENT.BIRTH_DATE)
        patient.webId = getStringNoLocale(thing, PATIENT.WEB_ID)

        patients.push(patient)
    }

    return patients
}

export async function addPrescription(prescription, webId, session) {
    try {
        const dataset = await getSolidDataset(webId)
        const profileThing = getThing(dataset, webId)
        const podsUrls = getUrlAll(
            profileThing,
            STORAGE_PREDICATE
        );
        const pod = podsUrls[0]
        const prescriptionUri = `${pod}Solid-Health/prescriptions.ttl`

        let prescriptionDataset = await getSolidDataset(prescriptionUri, { fetch: session.fetch })

        let prescriptionThing = buildThing(createThing({ name: prescription.patient + prescription.date }))
            .addStringNoLocale(PRESCRIPTION.DRUG, prescription.drug)
            .addStringNoLocale(PRESCRIPTION.DOSAGE, prescription.dosage)
            .addStringNoLocale(PRESCRIPTION.DOCTOR, prescription.doctor)
            .addStringNoLocale(PRESCRIPTION.PATIENT, prescription.patient)
            .addStringNoLocale(PRESCRIPTION.SCHEDULE, prescription.schedule)
            .addStringNoLocale(PRESCRIPTION.DATE_ISSUED, prescription.dateIssued)
            .build()

        prescriptionDataset = setThing(prescriptionDataset, prescriptionThing)
        await saveSolidDatasetAt(prescriptionUri, prescriptionDataset, { fetch: session.fetch })

    } catch (e) {
        console.log(e)
    }
}

export async function getPrescriptions(session) {
    let prescriptions = []
    const containerUrl = await getContainerUri(session)

    const prescriptionsDataset = await getSolidDataset(containerUrl + 'prescriptions.ttl', { fetch: session.fetch })

    const prescriptionThings = await getThingAll(prescriptionsDataset)

    for (let thing of prescriptionThings) {
        let prescription = {}

        prescription.patient = getStringNoLocale(thing, PRESCRIPTION.PATIENT)
        prescription.doctor = getStringNoLocale(thing, PRESCRIPTION.DOCTOR)
        prescription.dateIssued = getStringNoLocale(thing, PRESCRIPTION.DATE_ISSUED)
        prescription.drug = getStringNoLocale(thing, PRESCRIPTION.DRUG)
        prescription.dosage = getStringNoLocale(thing, PRESCRIPTION.DOSAGE)
        prescription.schedule = getStringNoLocale(thing, PRESCRIPTION.SCHEDULE)

        prescriptions.push(prescription)
    }

    return prescriptions
}


export async function getAppointments(session) {
    let appointments = []
    const containerUrl = await getContainerUri(session)

    const appointmentsDataset = await getSolidDataset(containerUrl + 'appointments.ttl', { fetch: session.fetch })

    const appointmentThings = await getThingAll(appointmentsDataset)

    for (let thing of appointmentThings) {
        let appointment = {}

        appointment.patient = getStringNoLocale(thing, APPOINTMENT.PATIENT)
        appointment.doctor = getStringNoLocale(thing, APPOINTMENT.DOCTOR)
        appointment.dateTime = getStringNoLocale(thing, APPOINTMENT.DATETIME)

        appointments.push(appointment)
    }

    return appointments
}

export async function makeAppointment(patient, appointment, session) {
    // Make the appointment on both patient and doctors appointment thing

    const containerUrl = await getContainerUri(session)

    const dataset = await getSolidDataset(patient.webId)
    const profileThing = getThing(dataset, patient.webId)
    const podsUrls = getUrlAll(
        profileThing,
        STORAGE_PREDICATE
    );
    const pod = podsUrls[0]
    const appointmentUri = `${pod}Solid-Health/appointments.ttl`

    let appointmentDatasetPatient = await getSolidDataset(appointmentUri, { fetch: session.fetch })
    let appointmentDatasetDoctor = await getSolidDataset(containerUrl + 'appointments.ttl', { fetch: session.fetch })

    let appointmentThing = buildThing(createThing({ name: 'Appointment @ ' + appointment.dateTime }))
        .setStringNoLocale(APPOINTMENT.DATETIME, appointment.dateTime)
        .setStringNoLocale(APPOINTMENT.DOCTOR, appointment.doctor)
        .setStringNoLocale(APPOINTMENT.PATIENT, patient.name)
        .build()

    appointmentDatasetDoctor = setThing(appointmentDatasetDoctor, appointmentThing)
    appointmentDatasetPatient = setThing(appointmentDatasetPatient, appointmentThing)


    await saveSolidDatasetAt(containerUrl + 'appointments.ttl', appointmentDatasetDoctor, { fetch: session.fetch })
    await saveSolidDatasetAt(appointmentUri, appointmentDatasetPatient, { fetch: session.fetch })
}