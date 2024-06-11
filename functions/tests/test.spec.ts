// // mirrorDatabaseToFirestore
import * as admin from "firebase-admin";
import * as test from "firebase-functions-test";
import { expect } from "chai";

import { mirrorDatabaseToFirestore } from "../src/index";
import { initializeFirebaseOnce } from "./initialize-firebase-once";
// import { EventContextOptions } from "firebase-functions-test/lib/v1";
import { Config, ConfigPath } from "../src/config";

import { describe, it } from "mocha";

initializeFirebaseOnce();

// const uid = 'test-uid';

const makeDataSnapshot = test().database.makeDataSnapshot;
// const options = {
//     eventId: 'temp-event-id',
//     timestamp: new Date().getTime().toString(),
//     auth: { uid },
//     authType: 'USER', // only for realtime database functions
// } as EventContextOptions;


describe('mirrorDatabaseToFirestore', () => {



    it('Create, Update, Delete for function 0', async () => {
        const path: ConfigPath = Config.paths[0];
        const wrapped = test().wrap(mirrorDatabaseToFirestore[0]);
        const id = 'id-0-' + (new Date).getTime();
        const value = 5;

        // Create data
        await wrapped(
            test().makeChange(makeDataSnapshot(null, path.source), makeDataSnapshot(value, path.source.replace('{id}', id))),
            {
                params: { id }
            });

        const snapshotGot = await admin.firestore().collection(path.destination).doc(id).get();
        console.log(snapshotGot.data())
        expect(snapshotGot.data()).to.deep.equal({ _data: value, id });

        // Update data
        const value2 = 10;
        await wrapped(
            test().makeChange(makeDataSnapshot(value, path.source.replace('{id}', id)), makeDataSnapshot(value2, path.source.replace('{id}', id))),
            {
                params: { id }
            });
        const snapshotGot2 = await admin.firestore().collection(path.destination).doc(id).get();
        console.log(snapshotGot2.data())
        expect(snapshotGot2.data()).to.deep.equal({ _data: value2, id });

        // Delete data
        await wrapped(
            test().makeChange(makeDataSnapshot(value2, path.source.replace('{id}', id)), makeDataSnapshot(null, path.source.replace('{id}', id)),),
            {
                params: { id }
            });
        const snapshotGot3 = await admin.firestore().collection(path.destination).doc(id).get();
        console.log(snapshotGot3.data())
        expect(snapshotGot3.data()).to.be.undefined;
    });



    it('Create, Update, Delete for function 1 - source: depth-3/{a}/{id}', async () => {
        const path: ConfigPath = Config.paths[1];
        const wrapped = test().wrap(mirrorDatabaseToFirestore[1]);
        const id = 'id-1-' + (new Date).getTime();
        const value = {
            name: 'name',
            timestamp: 123,
            exc: 'must be excluded',
        } as any;

        // Create data
        await wrapped(
            test().makeChange(makeDataSnapshot(null, path.source), makeDataSnapshot(value, path.source.replace('{id}', id))),
            {
                params: { id }
            });

        const snapshotGot = await admin.firestore().collection(path.destination).doc(id).get();
        console.log(snapshotGot.data())
        expect(snapshotGot.data()).to.deep.equal({ ...{ name: 'name', timestamp: 123 }, id });

        // // Update data
        // const value2 = 10;
        // await wrapped(
        //     test().makeChange(makeDataSnapshot(value, path.source.replace('{id}', id)), makeDataSnapshot(value2, path.source.replace('{id}', id))),
        //     {
        //         params: { id }
        //     });
        // const snapshotGot2 = await admin.firestore().collection(path.destination).doc(id).get();
        // console.log(snapshotGot2.data())
        // expect(snapshotGot2.data()).to.deep.equal({ _data: value2, id });

        // // Delete data
        // await wrapped(
        //     test().makeChange(makeDataSnapshot(value2, path.source.replace('{id}', id)), makeDataSnapshot(null, path.source.replace('{id}', id)),),
        //     {
        //         params: { id }
        //     });
        // const snapshotGot3 = await admin.firestore().collection(path.destination).doc(id).get();
        // console.log(snapshotGot3.data())
        // expect(snapshotGot3.data()).to.be.undefined;
    });



});
