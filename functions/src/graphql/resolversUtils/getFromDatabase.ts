import * as admin from 'firebase-admin';
import { Collections, WhereFilterOp } from '../../types';

const queryLimit = 10;

export const getFromDatabase = async (collectionName: Collections, docId?: string) => {
    if (docId) {
        const collectionData = await admin.firestore().collection(collectionName).doc(docId).get();

        return collectionData.data();
    } else {
        const collectionData = await admin.firestore().collection(collectionName).get();

        return prepareData(collectionData.docs);
    }
};

export const jobResult = async (limit: number = queryLimit, cursorId?: string) => {
    const dbRef = admin.firestore().collection(Collections.JOBS);
    const fieldToOrder = 'date.closing';
    const currentTime = new Date();

    if (cursorId) {
        const docRef = dbRef.doc(cursorId);

        return docRef.get().then(async (snapshot) => {
            const startAtSnapshot = dbRef.where(fieldToOrder, '>=', currentTime).orderBy(fieldToOrder).startAfter(snapshot);
            const collectionData = await startAtSnapshot.limit(limit).get();

            return prepareData(collectionData.docs, limit);
        });
    } else {
        const collectionData = await dbRef.where(fieldToOrder, '>=', currentTime).orderBy(fieldToOrder).limit(limit).get();

        return prepareData(collectionData.docs, limit);
    }
};

export const searchJobsOpen = async (
    condition: {
        field: string;
        operator: WhereFilterOp;
        value?: string;
        idValue?: number;
        arrayValue?: string[];
    },
    limit: number = queryLimit,
    cursorId?: string,
) => {
    const dbRef = admin.firestore().collection(Collections.JOBS);
    const fieldToOrder = 'date.closing';
    const { field, operator, value, idValue, arrayValue } = condition;

    if (cursorId) {
        const docRef = dbRef.doc(cursorId);

        return docRef.get().then(async (snapshot) => {
            const startAtSnapshot = dbRef
                .orderBy(fieldToOrder)
                .where(field, operator, value || idValue || arrayValue)
                .startAfter(snapshot);

            const collectionData = await startAtSnapshot.limit(queryLimit).get();

            return prepareData(collectionData.docs);
        });
    } else {
        const collectionData = await dbRef
            .orderBy(fieldToOrder)
            .limit(queryLimit)
            .where(field, operator, value || idValue || arrayValue)
            .get();

        return prepareData(collectionData.docs);
    }
};

export const searchJobsSpecific = async (
    condition: { fields: [string]; operators: [WhereFilterOp]; values: [string] },
    limit: number = queryLimit,
    cursorId?: string
) => {
    const dbRef = admin.firestore().collection(Collections.JOBS);
    const fieldToOrder = 'date.closing';
    const { fields, operators, values } = condition;
    const currentTime = new Date();

    if (cursorId) {
        const docRef = dbRef.doc(cursorId);

        return docRef.get().then(async (snapshot) => {
            let collectionDataRef = await dbRef.orderBy(fieldToOrder).limit(limit);

            fields.forEach((field: string, index: number) => {
                collectionDataRef = collectionDataRef.where(field, operators[index], values[index]);
            });

            const startAtSnapshot = collectionDataRef.startAfter(snapshot);

            const collectionData = await startAtSnapshot.limit(limit).get();

            return prepareData(collectionData.docs, limit);
        });
    } else {
        let collectionDataRef = await dbRef.orderBy(fieldToOrder).limit(limit);

        fields.forEach((field: string, index: number) => {
            // Filter out the data with incoming conditions
            collectionDataRef = collectionDataRef.where(field, operators[index], values[index]);
            // Order the filtered data with the latest (current date) results
            collectionDataRef = collectionDataRef.where(fieldToOrder, '>=', currentTime);
        });

        const collectionData = await collectionDataRef.get();
        return prepareData(collectionData.docs, limit);
    }
};

const prepareData = (collectionData: any, limit: number = queryLimit) => {
    const jobs =  collectionData.map((collection: any) => collection.data());
    const hasMoreJobs = jobs.length >= limit;

    return { jobs, hasMoreJobs }
};
