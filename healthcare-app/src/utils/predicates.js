export const STORAGE_PREDICATE = "http://www.w3.org/ns/pim/space#storage";

// PROFILE PREDICATES
export const PROFILE = {
    DATE_CREATED: "https://schema.org/dateCreated",
    ADDRESS: "https://schema.org/address",
    GIVEN_NAME: "https://schema.org/givenName",
    FAMILY_NAME: "https://schema.org/familyName",
    EMAIL: "https://schema.org/email",
    TELEPHONE: "https://schema.org/telephone",
    DOCTOR: "https://schema.org/accountablePerson",
    DOCTORS_ID: "https://schema.org/Physician",
    BIRTH_DATE: "https://schema.org/birthDate"
}

export const PATIENT = {
    WEB_ID: "https://schema.org/url",
    GIVEN_NAME: "https://schema.org/givenName",
    FAMILY_NAME: "https://schema.org/familyName",
    BIRTH_DATE: "https://schema.org/birthDate"
}

export const PRESCRIPTION = {
    DRUG: 'https://schema.org/Drug',
    DOSAGE: 'https://schema.org/dosageForm',
    SCHEDULE: 'https://schema.org/dosageForm',
    PATIENT: 'https://schema.org/name',
    DOCTOR: 'https://schema.org/Physician',
    DATE_ISSUED: 'https://schema.org/dateIssued'
}