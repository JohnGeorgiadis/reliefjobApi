import * as admin from "firebase-admin";
import { Collections } from "../types";

export const deleteJobs = async () => {
    const collectionRef = admin.firestore().collection(Collections.JOBS);

    const promises: any = [];

    return collectionRef
        .get()
        .then((qs) => {
            qs.forEach((docSnapshot) => {
                promises.push(docSnapshot.ref.delete());
            });
            return Promise.all(promises);
        })
        .catch((error) => {
            console.log(error);
            return false;
        });
}