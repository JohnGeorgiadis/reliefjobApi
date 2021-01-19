import * as fetch from "node-fetch";
import { Collections, Endpoints, ProfileTypes, ReliefApiData } from "../types";
import addDocToCollection from "../firestoreUtils/addDocToCollection";
import createEndpoint from "./createEndpoint";

export const getReliefApiJobs = async () => {
  let endpoint = createEndpoint({
    endpoint: Endpoints.JOBS,
    limit: 100,
    profileType: ProfileTypes.FULL,
  });
  let results;

  do {
    // @ts-ignore
    const request = await fetch(endpoint);
    results = await request.json();
    endpoint = results.links.next ? results.links.next.href : null;

    //Writing to DB
    results.data.forEach((jobData: ReliefApiData) =>
      addDocToCollection(normalizeData(jobData), Collections.JOBS)
    );
  } while (endpoint);

  return null;
};

const normalizeData = (originalData: ReliefApiData) => {
  const fieldsToPopulateKeywords = [
    "country",
    "career_categories",
    "city",
    "source",
    "type",
    "experience",
    "theme",
  ];
  const result: any = { ...originalData };
  result.keywords = [];
  delete result.fields;

  try {
    for (const [key, value] of Object.entries(originalData.fields)) {
      if (Array.isArray(value)) {
        result[normalizeKey(key)] = value[0];
        if (fieldsToPopulateKeywords.includes(key)) {
          if (key === "source") {
            result.keywords.push(value[0].type.name);
          }
          result.keywords.push(value[0].name);
        }
      } else {
        result[normalizeKey(key)] = value;
        if (fieldsToPopulateKeywords.includes(key)) {
          // @ts-ignore
          result.keywords.push(value.name);
        }
      }
    }
  } catch (e) {
    console.log(e);
  }

  // Convert date from API to a firebase timestamp
  const formattedDate = {
    changed: new Date(result.date.changed),
    closing: new Date(result.date.closing),
    created: new Date(result.date.created),
  };

  const formattedDateToString = {
    changedToDate: result.date.changed,
    closingToDate: result.date.closing,
    createdToDate: result.date.created,
  };

  result.date = { ...formattedDate, ...formattedDateToString };

  return result;
};

const normalizeKey = (keyValue: string) => {
  // Lame but we know that API fields are fixed
  switch (keyValue) {
    case "url_alias":
      return "urlAlias";
    case "how_to_apply-html":
      return "howToApplyHtml";
    case "how_to_apply":
      return "howToApply";
    case "career_categories":
      return "category";
    case "body-html":
      return "bodyHtml";
    default:
      return keyValue;
  }
};
