"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.convertData = exports.dog = exports.getProjectID = exports.chunkArray = exports.isDelete = exports.isUpdate = exports.isCreate = void 0;
const admin = require("firebase-admin");
// import { google } from "googleapis";
/**
 * Returns true if the event is a create event
 *
 * @param {functions.Change<functions.database.DataSnapshot>} change
 * @return {boolean}
 */
function isCreate(change) {
    return !change.before.exists() && change.after.exists();
}
exports.isCreate = isCreate;
/**
 * Returns true if the event is an update event
 *
 * @param {functions.Change<functions.database.DataSnapshot>} change
 * @return {boolean}
 */
function isUpdate(change) {
    return change.before.exists() && change.after.exists();
}
exports.isUpdate = isUpdate;
/**
 * Return true if the event is a delete event
 *
 * @param {functions.Change<functions.database.DataSnapshot>} change
 * @return {boolean}
 */
function isDelete(change) {
    return change.before.exists() && !change.after.exists();
}
exports.isDelete = isDelete;
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
function chunkArray(myArray, chunkSize) {
    const results = [];
    while (myArray.length) {
        results.push(myArray.splice(0, chunkSize));
    }
    return results;
}
exports.chunkArray = chunkArray;
/**
 * This function retrieves the project ID from the Firebase admin app options.
 *
 * @return {string} The project ID. If the project ID is not set in the app options,
 * it tries to retrieve it from the credential options. If it's not there either, it returns an empty string.
 */
function getProjectID() {
    const app = admin.app();
    // Return the project ID from the app options, or from the credential options if it's not set in the app options
    // If it's not set in either, return an empty string
    return app.options.projectId ||
        (app.options.credential && app.options.credential.projectId) || "";
}
exports.getProjectID = getProjectID;
/**
 * Debug console log
 *
 * @param {unknown[]} args arguments to be logged to the console
 */
function dog(...args) {
    console.log("-- dog;", ...args);
}
exports.dog = dog;
/**
 * Returns a map data that can be saved into Firestore
 *
 * @param {{[key:string]: any}} data data from realtime database
 * @returns {{[key:string]: any}}
 *
 * see `convertData.spec.ts` for the test
 */
function convertData(data) {
    if (data === null) {
        return null;
    }
    else if (Array.isArray(data)) {
        return { '_data': data };
    }
    else if (typeof data === 'object') {
        return data;
    }
    else {
        return { '_data': data };
    }
}
exports.convertData = convertData;
//# sourceMappingURL=libraries.js.map