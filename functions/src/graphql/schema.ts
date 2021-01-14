import { gql } from 'apollo-server-express';

const schema = gql`
    type Query {
        jobsSearchOpen(
            condition: ConditionData
            """
            ID of specific job to start pagination
            """
            cursorId: String
        ): [Job!]
        jobsSearchSpecific(
            condition: ConditionDataSpecific
            """
            ID of specific job to start pagination
            """
            cursorId: String
        ): [Job!]
        jobs(
            limit: Int
            """
            ID of specific job to start pagination
            """
            cursorId: String
        ): [Job!]
        job(id: ID!): Job!
        categories: [Category!]
        category(id: ID!): Category!
        cities: [CityData!]
        countries: [Country!]
        country(id: ID!): Country!
        experience: [FilterData!]
        jobType: [FilterData!]
        sourceType: [FilterData!]
        sources: [Source!]
        source(id: ID!): Source!
        themes: [FilterData!]
    }

    input ConditionDataSpecific {
        fields: [String!]
        """
        Available operatros: '<' | '<=' | '==' | '>=' | '>' | 'array-contains' | 'in' | 'array-contains-any'
        """
        operators: [String!]
        values: [String!]
    }
    input ConditionData {
        field: String!
        """
        Available operatros: '<' | '<=' | '==' | '>=' | '>' | 'array-contains' | 'in' | 'array-contains-any'
        """
        operator: String!
        value: String
        """
        If the field is type ID, use idValue to search
        """
        idValue: Int
        """
        If the field is type Keywords, use arrayValue to search
        """
        arrayValue: [String]
    }

    type Job {
        body: String!
        bodyHtml: String!
        careerCategories: CareerCategorieData!
        city: CityData
        country: CountryData
        date: DateData!
        experience: ExperienceData!
        howToApply: String!
        howToApplyHtml: String!
        href: String!
        id: ID!
        score: Int!
        source: SourceData!
        status: String!
        theme: FilterData
        title: String!
        type: JobTypeData!
        url: String!
        urlAlias: String!
        keywords: [String]!
    }

    type CareerCategorieData {
        id: ID!
        name: String!
    }

    type CityData {
        name: String!
    }

    type CountryData {
        href: String!
        id: ID!
        iso3: String!
        location: LocationData!
        name: String!
        shortname: String!
    }

    type LocationData {
        lat: String!
        lon: String!
    }

    type DateData {
        changed: String!
        closing: String!
        created: String!
        changedToDate: String!
        closingToDate: String!
        createdToDate: String!
    }

    type ExperienceData {
        id: ID!
        name: String!
    }

    type SourceData {
        homepage: String!
        href: String!
        id: ID!
        name: String!
        shortname: String!
        type: SourceDataType!
    }

    type SourceDataType {
        id: Int!
        name: String!
    }

    type JobTypeData {
        id: ID!
        name: String!
    }

    type Category {
        id: ID!
        name: String!
    }

    type Country {
        fields: CountryField!
        href: String!
        id: ID!
        score: Int!
    }

    type CountryField {
        name: String!
    }

    type FilterData {
        id: ID!
        name: String!
    }

    type Source {
        homepage: String!
        href: String!
        id: ID!
        longname: String!
        name: String!
        shortname: String!
        type: SourceDataType!
    }

    type User {
        id: ID!
        email: String!
        profileImage: String
    }
`;

export default schema;
