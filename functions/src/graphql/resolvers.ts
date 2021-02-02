import { Collections, WhereFilterOp } from '../types';
import { getFromDatabase, jobResult, searchJobsOpen, searchJobsSpecific } from './resolversUtils/getFromDatabase';

type ResolverIdParam = { id: string };
type ResolverJobParams = { limit?: number; cursorId?: string };
type ResolverSearchOpenParams = {
    condition: {
        field: string;
        operator: WhereFilterOp;
        value?: string;
        idValue?: number;
    };
    limit?: number;
    cursorId?: string;
};
type ResolverSearchSpecificParams = {
    condition: { fields: [string]; operators: [WhereFilterOp]; values: [string] };
    limit?: number;
    cursorId?: string;
};

const resolverFunctions = {
    Query: {
        jobsSearchOpen: async (_: any, { condition, limit, cursorId }: ResolverSearchOpenParams) => {
            return await searchJobsOpen(condition, limit, cursorId);
        },
        jobsSearchSpecific: async (_: any, { condition, limit, cursorId }: ResolverSearchSpecificParams) => {
            return await searchJobsSpecific(condition, limit, cursorId);
        },
        allJobs: async (_: any, { limit, cursorId }: ResolverJobParams) => {
            return await jobResult(limit, cursorId);
        },
        job: async (_: any, { id }: ResolverIdParam) => {
            return await getFromDatabase(Collections.JOBS, id);
        },
        categories: async (_: any) => {
            return await getFromDatabase(Collections.CATEGORIES);
        },
        category: async (_: any, { id }: ResolverIdParam) => {
            return await getFromDatabase(Collections.CATEGORIES, id);
        },
        countries: async (_: any) => {
            return await getFromDatabase(Collections.COUNTRIES);
        },
        country: async (_: any, { id }: ResolverIdParam) => {
            return await getFromDatabase(Collections.COUNTRIES, id);
        },
        cities: async (_: any) => {
            return await getFromDatabase(Collections.CITIES);
        },
        experience: async (_: any) => {
            return await getFromDatabase(Collections.EXPERIENCE);
        },
        jobType: async (_: any) => {
            return await getFromDatabase(Collections.JOB_TYPE);
        },
        sourceType: async (_: any) => {
            return await getFromDatabase(Collections.SOURCE_TYPES);
        },
        sources: async (_: any) => {
            return await getFromDatabase(Collections.SOURCES);
        },
        source: async (_: any, { id }: ResolverIdParam) => {
            return await getFromDatabase(Collections.SOURCES, id);
        },
        themes: async (_: any) => {
            return await getFromDatabase(Collections.THEMES);
        },
    },
};

export default resolverFunctions;
