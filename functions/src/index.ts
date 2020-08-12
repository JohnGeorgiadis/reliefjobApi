import * as functions from "firebase-functions";
import * as admin from "firebase-admin";
import { getReliefApiJobs } from "./reliefApi/getReliefApiJobs";
import { populateFilters } from "./firestoreUtils/populateFilters";
import gqlServer from "./graphql/server";
import { deleteJobs } from "./reliefApi/deleteJobs";

admin.initializeApp();
const server = gqlServer();

//every monday 09:00
exports.getReliefApiJobs = functions.pubsub
    .schedule("every monday 09:00")
    .onRun(async (context) => {
        await deleteJobs();
        await getReliefApiJobs();
    });

//once every month
// exports.getReliefCountries = functions.pubsub.schedule('1 of month 09:00').onRun(async (context) => await getReliefApiCountries());

//every monday 11:00
exports.populateFilters = functions.pubsub
    .schedule("1 of month 09:00")
    .onRun(async (context) => await populateFilters());

exports.api = functions.https.onRequest(server);
