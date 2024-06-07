
import { expect } from "chai";
import * as admin from "firebase-admin";


import { describe, it } from "mocha";
import { initializeFirebaseOnce } from "../tests/initialize-firebase-once";

initializeFirebaseOnce();

describe("Mirror database to firestore", () => {

    it('로컬 RTDB 에 값 생성', async () => {
        // 로컬 RTDB 에 값 생성. 이렇게 하기 위해서는 로컬 RTDB 에뮬레이터를 띄워야 한다.
        const path = 'etc/key-1';
        const rtdb = admin.database();
        const ref = rtdb.ref(path);
        await ref.set('value-1');


        // 원격 실제 Firestore 에 값이 잘 복사되었는지 확인
        const snapshotGot1 = await admin.firestore().collection('mirror-etc').doc('key-1').get();
        const data1 = snapshotGot1.data();
        console.log(data1);
        expect(data1).to.deep.equal({ _data: 'value-1' });
    });

    // it('CRUD under deep depths', async () => {
    //     // 경로를 지정하는 경우, 클라우드 함수에서 path 값을 그냥 그대로 받아 들인다.
    //     let path = 'forum/{caetgory}/{uid}/posts/{postId}';
    //     const wrapped = test().wrap(mirrorDatabaseToFirestore);

    //     // 데이터 생성
    //     await wrapped(
    //         test().makeChange(
    //             makeDataSnapshot(null, path), // 실행 전 데이터 존재하지 않음
    //             makeDataSnapshot(false, path), // 실행 후 데이터 존재
    //         ),
    //         {
    //             eventId: 'temp-event-id',
    //             timestamp: new Date().getTime().toString(),
    //             auth: { uid },
    //             authType: 'USER', // only for realtime database functions
    //             params: { category: 'cat1', uid: 'uid1', postId: 'post1' }
    //         }
    //     );

    //     const snapshotGot1 = await admin.firestore().collection(Config.toPath).doc('{postId}').get();
    //     const data1 = snapshotGot1.data();
    //     console.log(data1);
    //     expect(data1).to.deep.equal({ _data: false, category: 'cat1', uid: 'uid1', postId: 'post1' });

    //     // 데이터 수정
    //     const input2 = { a: 'apple', "b": 2 };
    //     await wrapped(
    //         test().makeChange(
    //             makeDataSnapshot(true, path), // 실행 전 데이터 존재 함!!
    //             makeDataSnapshot(input2, path), // 실행 후에도 데이터 존재!!
    //         ),
    //         {
    //             params: { category: 'cat1', uid: 'uid1', postId: 'post1' }
    //         }
    //     );

    //     const snapshotGot2 = await admin.firestore().collection(Config.toPath).doc('{postId}').get();
    //     const data2 = snapshotGot2.data();
    //     expect(data2).to.deep.equal({ ...input2, ...{ category: 'cat1', uid: 'uid1', postId: 'post1' } });

    //     // 데이터 삭제
    //     await wrapped(
    //         test().makeChange(
    //             makeDataSnapshot(0, path), // 실행 전 데이터 존재 함!!
    //             makeDataSnapshot(null, path), // 실행 후에도 데이터 존재 안 함!!
    //         ),
    //         {},
    //     );
    //     const snapshotGot3 = await admin.firestore().collection(Config.toPath).doc('{postId}').get();
    //     const data3 = snapshotGot3.data();
    //     expect(data3).to.be.undefined;
    // });
});
