import * as admin from 'firebase-admin';
import { Collections } from '../types';
import addDocToCollection from './addDocToCollection';

export const populateFilters = () => {
    const db = admin.firestore();

    const jobsRef = db.collection(Collections.JOBS);

    jobsRef
        .get()
        .then((snapshot) => {
            snapshot.forEach(async (job) => {
                const { experience, category, type, source } = job.data();
                // write experience
                await addDocToCollection(experience, Collections.EXPERIENCE);

                // write categories
                await addDocToCollection(category, Collections.CATEGORIES);

                // write themes
                if (job.data().hasOwnProperty('theme')) {
                    const { theme } = job.data();
                    await addDocToCollection(theme, Collections.THEMES);
                }

                // write jobs type
                await addDocToCollection(type, Collections.JOB_TYPE);

                // write sources organizations
                await addDocToCollection(source, Collections.SOURCES);

                // write sources types
                await addDocToCollection(source.type, Collections.SOURCE_TYPES);

                // write cities
                if (job.data().hasOwnProperty('city')) {
                    const { city } = job.data();
                    await addDocToCollection(city, Collections.CITIES);
                }
            });
        })
        .catch((err) => {
            console.log('Error getting documents', err);
        });
    return null;
};
