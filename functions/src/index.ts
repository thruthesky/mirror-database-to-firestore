
import * as admin from "firebase-admin";
import * as functions from "firebase-functions";
import { DataSnapshot, DatabaseEvent, onValueWritten } from "firebase-functions/v2/database";

import { Config } from "./config";
import { convertData, dog, isCreate, isDelete, isUpdate } from "./libraries";
// import { Config } from "./config";
// import { convertData, dog, isCreate, isDelete, isUpdate } from "./libraries";

if (admin.apps.length === 0) {
  admin.initializeApp();
}


export const mirrorDatabaseToFirestore =

  Config.paths.map((path) => {
    /// TODO - Convert it to Gen2
    return onValueWritten(path.source, async (event: DatabaseEvent<functions.Change<DataSnapshot>>) => {

      const change = event.data;
      const params = event.params;

      dog("Begin with params: ", params);
      console.log("Path properties; source=>", path.source, "destination=>", path.destination, "fields=>", path.fields);
      dog("change.before: key: ", change.before.key, ", value: ", change.before.val());
      dog("change.after: key: ", change.after.key, ", value: ", change.after.val());

      const db = admin.firestore();
      const ref = db.collection(path.destination).doc(change.after.key as string);

      // created or updated
      if (isCreate(change) || isUpdate(change)) {
        const data = { ...convertData(path, change.after.val()), ...params };
        dog("Data to write at path: ", ref.path, ", data: ", data);
        await ref.set(data);
      } else if (isDelete(change)) {
        // deleted
        dog("-- Delete;");
        await ref.delete();
      }
    });
  });


