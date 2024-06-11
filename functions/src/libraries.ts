import * as admin from "firebase-admin";
import * as functions from "firebase-functions";
import {ConfigPath} from "./config";
// import { google } from "googleapis";


/**
 * Returns true if the event is a create event
 *
 * @param {functions.Change<functions.database.DataSnapshot>} change
 * @return {boolean}
 */
export function isCreate(change: functions.Change<functions.database.DataSnapshot>): boolean {
  return !change.before.exists() && change.after.exists();
}


/**
 * Returns true if the event is an update event
 *
 * @param {functions.Change<functions.database.DataSnapshot>} change
 * @return {boolean}
 */
export function isUpdate(change: functions.Change<functions.database.DataSnapshot>): boolean {
  return change.before.exists() && change.after.exists();
}

/**
 * Return true if the event is a delete event
 *
 * @param {functions.Change<functions.database.DataSnapshot>} change
 * @return {boolean}
 */
export function isDelete(change: functions.Change<functions.database.DataSnapshot>): boolean {
  return change.before.exists() && !change.after.exists();
}


/**
 * Returns chunks of the array
 *
 *
 * @param {T[]} myArray The array to be chunked
 * @param {number} chunkSize The size of the chunk
 *
 * @return {number}
 *
 * see `chunkArray.spec.ts` for the test
 *
 */
export function chunkArray<T>(myArray: T[], chunkSize: number): T[][] {
  const results = [];
  while (myArray.length) {
    results.push(myArray.splice(0, chunkSize));
  }
  return results as T[][];
}

/**
 * This function retrieves the project ID from the Firebase admin app options.
 *
 * @return {string} The project ID. If the project ID is not set in the app options,
 * it tries to retrieve it from the credential options. If it's not there either, it returns an empty string.
 */
export function getProjectID(): string {
  const app = admin.app();
  // Return the project ID from the app options, or from the credential options if it's not set in the app options
  // If it's not set in either, return an empty string
  return app.options.projectId ||
    (app.options.credential && (app.options.credential as unknown as { projectId: string }).projectId) || "";
}


/**
 * Debug console log
 *
 * @param {unknown[]} args arguments to be logged to the console
 */
export function dog(...args: unknown[]) {
  console.log("-- dog;", ...args);
}


/**
 * Returns a map data that can be saved into Firestore
 *
 * @param { ConfigPath } path The path to be converted
 * @param { object } data The data to be converted
 * @return { object }
 *
 * see `convertData.spec.ts` for the test
 */
export function convertData(path: ConfigPath, data: { [key: string]: unknown }): { [key: string]: unknown } {
  if (data === null) {
    return {};
  } else if (Array.isArray(data)) {
    return {"_data": data};
  } else if (typeof data === "object") {
    // If the fields are specified, only include those fields
    if (path.fields) {
      const result = {} as { [key: string]: unknown };
      path.fields.forEach((field) => {
        if (data[field]) result[field] = data[field];
      });
      return result;
    } else {
      return data;
    }
  } else {
    return {"_data": data};
  }
}

