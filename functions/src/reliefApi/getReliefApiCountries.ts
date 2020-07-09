import * as fetch from 'node-fetch';
import { Collections, Endpoints, ReliefApiData } from '../types';
import addDocToCollection from '../firestoreUtils/addDocToCollection';
import createEndpoint from './createEndpoint';

export const getReliefApiCountries = async () => {
    let endpoint = createEndpoint({ endpoint: Endpoints.COUNTRIES, limit: 100 });
    let results;

    do {
        // @ts-ignore
        const request = await fetch(endpoint);
        results = await request.json();
        endpoint = results.links.next ? results.links.next.href : null;

        //Writing to DB
        results.data.forEach((countryData: ReliefApiData) => addDocToCollection(countryData, Collections.COUNTRIES));
    } while (endpoint);

    return null;
};
