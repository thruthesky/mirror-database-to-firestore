"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.mirrorDatabaseToFirestore = void 0;
const admin = require("firebase-admin");
const functions = require("firebase-functions");
const config_1 = require("./config");
const libraries_1 = require("./libraries");
if (admin.apps.length === 0) {
    admin.initializeApp();
}
exports.mirrorDatabaseToFirestore = functions.database.ref(config_1.Config.fromPath)
    .onWrite(async (change, context) => {
    console.log("Config properties; ", config_1.Config.fromPath, config_1.Config.toPath, config_1.Config.fields);
    (0, libraries_1.dog)("-- mirrorDatabaseToFirestore begins; change.before:", change.before.val(), "change.after:", change.after.val());
    const db = admin.firestore();
    const ref = db.collection(config_1.Config.toPath).doc(change.after.key);
    // created or updated
    if ((0, libraries_1.isCreate)(change) || (0, libraries_1.isUpdate)(change)) {
        const data = Object.assign(Object.assign({}, (0, libraries_1.convertData)(change.after.val())), context.params);
        (0, libraries_1.dog)("Create or update;", context.params, 'data; ', data);
        await ref.set(data);
    }
    else if ((0, libraries_1.isDelete)(change)) {
        // deleted
        (0, libraries_1.dog)("-- Delete;");
        await ref.delete();
    }
});
//# sourceMappingURL=index.js.map