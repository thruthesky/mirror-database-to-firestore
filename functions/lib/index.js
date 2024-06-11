"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.mirrorDatabaseToFirestore = void 0;
const admin = require("firebase-admin");
const database_1 = require("firebase-functions/v2/database");
const config_1 = require("./config");
const libraries_1 = require("./libraries");
// import { Config } from "./config";
// import { convertData, dog, isCreate, isDelete, isUpdate } from "./libraries";
if (admin.apps.length === 0) {
    admin.initializeApp();
}
exports.mirrorDatabaseToFirestore = config_1.Config.paths.map((path) => {
    return (0, database_1.onValueWritten)({
        ref: path.source,
        region: config_1.Config.region,
    }, async (event) => {
        const change = event.data;
        const params = event.params;
        (0, libraries_1.dog)("Begin with params: ", params);
        console.log("Path properties; source=>", path.source, "destination=>", path.destination, "fields=>", path.fields);
        (0, libraries_1.dog)("change.before: key: ", change.before.key, ", value: ", change.before.val());
        (0, libraries_1.dog)("change.after: key: ", change.after.key, ", value: ", change.after.val());
        const db = admin.firestore();
        const ref = db.collection(path.destination).doc(change.after.key);
        // created or updated
        if ((0, libraries_1.isCreate)(change) || (0, libraries_1.isUpdate)(change)) {
            const data = Object.assign(Object.assign({}, (0, libraries_1.convertData)(path, change.after.val())), params);
            (0, libraries_1.dog)("Data to write at path: ", ref.path, ", data: ", data);
            await ref.set(data);
        }
        else if ((0, libraries_1.isDelete)(change)) {
            // deleted
            (0, libraries_1.dog)("-- Delete;");
            await ref.delete();
        }
    });
});
//# sourceMappingURL=index.js.map