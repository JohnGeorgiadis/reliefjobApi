import { Endpoints, ProfileTypes } from '../types';

interface Configuration {
    endpoint: Endpoints;
    limit?: number;
    profileType?: ProfileTypes;
}

const createEndpoint = (configuration: Configuration): string => {
    const { endpoint, limit, profileType } = configuration;
    const appName = 'j.georgiadiss@gmail.com';
    return `https://api.reliefweb.int/v1/${endpoint}?appname=${appName}&profile=${profileType}&limit=${limit}`;
};

export default createEndpoint;
