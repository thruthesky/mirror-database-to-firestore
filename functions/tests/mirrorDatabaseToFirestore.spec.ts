// mirrorDatabaseToFirestore
import * as admin from "firebase-admin";
import * as test from "firebase-functions-test";
import { expect } from "chai";

import { mirrorDatabaseToFirestore } from "../src/index";
import { initializeFirebaseOnce } from "./initialize-firebase-once";
import { EventContextOptions } from "firebase-functions-test/lib/v1";
import { Config } from "../src/config";

import { describe, it } from "mocha";

initializeFirebaseOnce();

const uid = 'test-uid';

const makeDataSnapshot = test().database.makeDataSnapshot;
const options = {
    eventId: 'temp-event-id',
    timestamp: new Date().getTime().toString(),
    auth: { uid },
    authType: 'USER', // only for realtime database functions
} as EventContextOptions;


describe('mirrorDatabaseToFirestore', () => {
    it('Create node and mirror', async () => {
        const path = 'tests/id-1';

        const wrapped = test().wrap(mirrorDatabaseToFirestore);

        const data = 0;

        // 데이터 생성
        const createSnap = test().database.makeDataSnapshot(data, path);
        const nullSnap = test().database.makeDataSnapshot(null, path);

        await wrapped(
            test().makeChange(nullSnap, createSnap),
            {
                eventId: 'temp-event-id',
                timestamp: new Date().getTime().toString(),
                auth: { uid },
                authType: 'USER', // only for realtime database functions
            });

        const snapshotGot = await admin.firestore().collection('mirror-to').doc('id-1').get();
        expect(snapshotGot.data()).to.deep.equal({ _data: data });
    });


    it('Create node and update, then check mirror, then delte, then check mirror', async () => {
        const path = 'tests/id-2';
        const wrapped = test().wrap(mirrorDatabaseToFirestore);

        // 데이터 생성
        await wrapped(
            test().makeChange(
                makeDataSnapshot(null, path), // 실행 전 데이터 존재하지 않음
                makeDataSnapshot(false, path), // 실행 후 데이터 존재
            ),
            options
        );

        const snapshotGot = await admin.firestore().collection('mirror-to').doc('id-2').get();
        expect(snapshotGot.data()).to.deep.equal({ _data: false });

        // 데이터 수정
        const input2 = { a: 'apple', "b": 2 };
        await wrapped(
            test().makeChange(
                makeDataSnapshot(true, path), // 실행 전 데이터 존재 함!!
                makeDataSnapshot(input2, path), // 실행 후에도 데이터 존재!!
            ),
            options
        );

        const snapshotGot2 = await admin.firestore().collection('mirror-to').doc('id-2').get();
        const data2 = snapshotGot2.data();
        expect(data2).to.deep.equal(input2);

        // 데이터 삭제
        await wrapped(
            test().makeChange(
                makeDataSnapshot(0, path), // 실행 전 데이터 존재 함!!
                makeDataSnapshot(null, path), // 실행 후에도 데이터 존재 안 함!!
            ),
            options
        );
        const snapshotGot3 = await admin.firestore().collection('mirror-to').doc('id-2').get();
        const data3 = snapshotGot3.data();
        expect(data3).to.be.undefined;
    });


    it('CRUD under deep depths', async () => {
        // 경로를 지정하는 경우, 클라우드 함수에서 path 값을 그냥 그대로 받아 들인다.
        // 즉, param: { .. } 값을 어떻게 전달하던 상관 없다.
        Config.toPath = "new-mirror-to";
        let path = 'forum/{caetgory}/{uid}/posts/{postId}';
        const wrapped = test().wrap(mirrorDatabaseToFirestore);

        // 데이터 생성
        await wrapped(
            test().makeChange(
                makeDataSnapshot(null, path), // 실행 전 데이터 존재하지 않음
                makeDataSnapshot(false, path), // 실행 후 데이터 존재
            ),
            {
                eventId: 'temp-event-id',
                timestamp: new Date().getTime().toString(),
                auth: { uid },
                authType: 'USER', // only for realtime database functions
                params: { category: 'cat1', uid: 'uid1', postId: 'post1' }
            }
        );

        const snapshotGot1 = await admin.firestore().collection(Config.toPath).doc('{postId}').get();
        const data1 = snapshotGot1.data();
        console.log(data1);
        expect(data1).to.deep.equal({ _data: false, category: 'cat1', uid: 'uid1', postId: 'post1' });

        // 데이터 수정
        const input2 = { a: 'apple', "b": 2 };
        await wrapped(
            test().makeChange(
                makeDataSnapshot(true, path), // 실행 전 데이터 존재 함!!
                makeDataSnapshot(input2, path), // 실행 후에도 데이터 존재!!
            ),
            {
                params: { category: 'cat1', uid: 'uid1', postId: 'post1' }
            }
        );

        const snapshotGot2 = await admin.firestore().collection(Config.toPath).doc('{postId}').get();
        const data2 = snapshotGot2.data();
        expect(data2).to.deep.equal({ ...input2, ...{ category: 'cat1', uid: 'uid1', postId: 'post1' } });

        // 데이터 삭제
        await wrapped(
            test().makeChange(
                makeDataSnapshot(0, path), // 실행 전 데이터 존재 함!!
                makeDataSnapshot(null, path), // 실행 후에도 데이터 존재 안 함!!
            ),
            options
        );
        const snapshotGot3 = await admin.firestore().collection(Config.toPath).doc('{postId}').get();
        const data3 = snapshotGot3.data();
        expect(data3).to.be.undefined;
    });
});
