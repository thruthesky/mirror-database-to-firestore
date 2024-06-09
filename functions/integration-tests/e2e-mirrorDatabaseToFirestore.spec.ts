
import { expect } from "chai";
import * as admin from "firebase-admin";
import * as test from "firebase-functions-test";

import { mirrorDatabaseToFirestore } from "../src/index";

import { describe, it } from "mocha";
import { initializeFirebaseOnce } from "../tests/initialize-firebase-once";

initializeFirebaseOnce();

// 주의: 테스트를 할 때에는 .env 파일을 불러 오지 못하고 있다.
// 그런데 http 테스트 할 때에는 어떻게 불러 왔나?
describe("Mirror database to firestore", () => {

    it('로컬 RTDB 에 값 생성', async () => {
        // 로컬 RTDB 에 값 생성. 이렇게 하기 위해서는 로컬 RTDB 에뮬레이터를 띄워야 한다.

        const path = 'etc/key-1';
        const makeDataSnapshot = test().database.makeDataSnapshot;
        const wrapped = test().wrap(mirrorDatabaseToFirestore);

        await wrapped(
            test().makeChange(
                makeDataSnapshot(null, path), // 실행 전 데이터 존재하지 않음
                makeDataSnapshot('value-1', path), // 실행 후 데이터 존재
            )
        );


        //
        // 원격 실제 Firestore 에 값이 잘 복사되었는지 확인
        const snapshotGot1 = await admin.firestore().collection('mirror-etc').doc('key-1').get();
        const data1 = snapshotGot1.data();
        console.log(data1);
        expect(data1).to.deep.equal({ _data: 'value-1' });
    });

});
