export enum Collections {
    JOBS = 'jobs',
    COUNTRIES = 'countries',
    EXPERIENCE = 'experience',
    CATEGORIES = 'categories',
    THEMES = 'themes',
    CITIES = 'cities',
    JOB_TYPE = 'jobType',
    SOURCES = 'sources',
    SOURCE_TYPES = 'sourceType',
    USERS = 'users',
}

export enum Endpoints {
    JOBS = 'jobs',
    COUNTRIES = 'countries',
}

export enum ProfileTypes {
    'MINIMAL' = 'minimal',
    'FULL' = 'full',
    'LIST' = 'list',
}

export interface ReliefApiData {
    id: number;
    fields: Record<string, unknown>;
    href: string;
}

export interface FiltersData {
    id: number;
    name: string;
    homepage?: string;
    href?: string;
    shortname?: string;
    type?: {
        id: number;
        name: string;
    };
}

export type WhereFilterOp = '<' | '<=' | '==' | '>=' | '>' | 'array-contains' | 'in' | 'array-contains-any';
