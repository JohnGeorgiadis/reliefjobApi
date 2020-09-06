import * as admin from 'firebase-admin';
import { Collections, FiltersData, ReliefApiData } from '../types';

const addDocToCollection = async (data: ReliefApiData | FiltersData, databaseRef: Collections) => {
  const db = admin.firestore();
  const dbRef = db.collection(databaseRef);

  if (data.id) {
    dbRef
      .doc('' + data.id)
      .set(data)
      .then((results) => {
        console.log(results);
      })
      .catch((err) => {
        console.log(`Error writing to db ${databaseRef}`, err);
      });
  } else {
    if ('name' in data) {
      dbRef
        .doc('' + data.name)
        .set(data)
        .then((results) => {
          console.log(results);
        })
        .catch((err) => {
          console.log(`Error writing to db ${databaseRef}`, err);
        });
    }
  }

  return null;
};

export default addDocToCollection;
