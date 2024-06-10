// mirrorDatabaseToFirestore
import * as admin from "firebase-admin";
import * as test from "firebase-functions-test";
import { expect } from "chai";

import { mirrorDatabaseToFirestore } from "../src/index";
import { initializeFirebaseOnce } from "./initialize-firebase-once";
import { Config } from "../src/config";

import { describe, it } from "mocha";

initializeFirebaseOnce();

const uid = 'test-uid';

const makeDataSnapshot = test().database.makeDataSnapshot;

describe('mirrorDatabaseToFirestore', () => {

    it('CRUD from /tmp/from/{uid}/posts/{postId} to firestore /mirror-tmp', async () => {
        Config.fromPath = "/tmp/from/uid1/posts/postId1";
        Config.toPath = "new-mirror-to";
        const wrapped = test().wrap(mirrorDatabaseToFirestore);
        // 데이터 생성
        await wrapped(
            test().makeChange(
                makeDataSnapshot(null, Config.fromPath), // 실행 전 데이터 존재하지 않음
                makeDataSnapshot({ a: 'apple', b: 'banana' }, Config.fromPath), // 실행 후 데이터 존재
            ),
            {
                eventId: 'temp-event-id',
                timestamp: new Date().getTime().toString(),
                auth: { uid },
                authType: 'USER', // only for realtime database functions
                params: { uid: 'uid1', postId: 'post1' }
            }
        );

        const snapshotGot2 = await admin.firestore().collection(Config.toPath).doc('postId1').get();
        const data2 = snapshotGot2.data();
        console.log(data2);

        // 데이터 생성
        await wrapped(
            test().makeChange(
                makeDataSnapshot(null, "tmp/from/uid1/postId2"), // 실행 전 데이터 존재하지 않음
                makeDataSnapshot({ a: 'Apple2', b: 'Banana2' }, "tmp/from/uid1/postId2"), // 실행 후 데이터 존재
            ),
            {
                eventId: 'temp-event-id',
                timestamp: new Date().getTime().toString(),
                auth: { uid },
                authType: 'USER', // only for realtime database functions
                params: { uid: 'uid1', postId: 'post2' }
            }
        );

        const snapshotGot3 = await admin.firestore().collection(Config.toPath).doc('postId2').get();
        const data3 = snapshotGot3.data();
        console.log(data3);

        expect(data3).to.deep.equal({ a: 'Apple2', b: 'Banana2', 'uid': 'uid1', 'postId': 'post2' });

    });
});
