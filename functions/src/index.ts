
import * as admin from "firebase-admin";
import * as functions from "firebase-functions";
import { Config } from "./config";
import { convertData, dog, isCreate, isDelete, isUpdate } from "./libraries";

if (admin.apps.length === 0) {
  admin.initializeApp();
}

export const mirrorDatabaseToFirestore = functions.database.ref(Config.fromPath)
  .onWrite(async (change: functions.Change<functions.database.DataSnapshot>, context: functions.EventContext<{
    [key: string]: string;
  }>) => {
    console.log("Config properties; ", Config.fromPath, Config.toPath, Config.fields);
    dog("-- mirrorDatabaseToFirestore begins; change.before:", change.before.val(), "change.after:", change.after.val());

    const db = admin.firestore();
    const ref = db.collection(Config.toPath).doc(change.after.key!);

    // created or updated
    if (isCreate(change) || isUpdate(change)) {
      const data = { ...convertData(change.after.val()), ...context.params };
      dog("Create or update;", context.params, 'data; ', data);
      await ref.set(data);
    } else if (isDelete(change)) {
      // deleted
      dog("-- Delete;");
      await ref.delete();
    }

  });