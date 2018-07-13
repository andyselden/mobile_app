import { call, fork, put, select, takeEvery } from 'redux-saga/effects'
import { kernelActionTypes, alertActionTypes } from '../constants/actionTypes'
import firebase from 'firebase'
import rsf from '../rsf'

function * addTextItemSaga (action) {
    try{
        const user = yield select(state => state.user.user)
        yield fork(
            clearOutdatedItemsSaga,
            firebase.firestore().collection('kernels').doc(user.uid).collection('items')
        )

        yield fork(
            updateDocSaga,
            firebase.firestore().collection('kernels').doc(user.uid).collection('items').doc(),
            {
                type: 'TEXT',
                text: action.text,
                updatedAt: firebase.firestore.FieldValue.serverTimestamp()
            }
        )

        yield call(
            updateDocSaga,
            firebase.firestore().collection('kernels').doc(user.uid),
            {
                updatedAt: firebase.firestore.FieldValue.serverTimestamp()
            }
        )

        yield put({ type: kernelActionTypes.ADD_TEXT_ITEM.FULFILLED })
        const successMessage = `${ action.fileName } is finished uploading to around you`
        //yield put({ type: kernelActionTypes.ADD_IMAGE_ITEM.FULFILLED,  successMessage})
    } catch (error) {
        yield put({ type: kernelActionTypes.ADD_TEXT_ITEM.REJECTED, error })
    }
}


function * addFileItemSaga (action) {
    try{
        const user = yield select(state => state.user.user)
        yield fork(
            clearOutdatedItemsSaga,
            firebase.firestore.collection('kernels').doc(user.uid).collection('items')
        )

        yield call(
            uploadFileSaga,
            action.uri,
            `items/${ user.uid }/${ action.fileName }`
        )

        yield fork(
            updateDocSaga,
            `kernels/${ user.uid }/items/tommy`,
            {
                type: 'IMAGE',
                fileReference: `items/${ user.uid }/${ action.fileName }`,
                fileName: action.fileName,
                updatedAt: firebase.firestore.FieldValue.serverTimestamp()
            }
        )

        yield call(
            updateDocSaga,
            `kernels/${ user.uid }`,
            {
                updatedAt: firebase.firestore.FieldValue.serverTimestamp()
            }
        )

        yield put({ type: kernelActionTypes.ADD_IMAGE_ITEM.FULFILLED })

        const successMessage = `${ action.fileName } is finished uploading to around you`
        //yield put({ type: kernelActionTypes.ADD_IMAGE_ITEM.FULFILLED,  successMessage})
    } catch (error) {
        yield put({ type: kernelActionTypes.ADD_IMAGE_ITEM.REJECTED, error })
    }
}


function * addImageItemSaga (action) {
    try{
        const user = yield select(state => state.user.user)
        yield fork(
            clearOutdatedItemsSaga,
            firebase.firestore().collection('kernels').doc(user.uid).collection('items')
        )

        yield call(
            uploadFileSaga,
            action.uri,
            `items/${ user.uid }/${ action.fileName }`
        )

        yield fork(
            updateDocSaga,
            firebase.firestore().collection('kernels').doc(user.uid).collection('items').doc(),
            {
                type: 'IMAGE',
                fileReference: `items/${ user.uid }/${ action.fileName }`,
                fileName: action.fileName,
                updatedAt: firebase.firestore.FieldValue.serverTimestamp()
            }
        )

        yield call(
            updateDocSaga,
            firebase.firestore().collection('kernels').doc(user.uid),
            {
                updatedAt: firebase.firestore.FieldValue.serverTimestamp()
            }
        )

        yield put({ type: kernelActionTypes.ADD_IMAGE_ITEM.FULFILLED })

        const successMessage = `${ action.fileName } is finished uploading to around you`
        //yield put({ type: kernelActionTypes.ADD_IMAGE_ITEM.FULFILLED,  successMessage})
    } catch (error) {
        yield put({ type: kernelActionTypes.ADD_IMAGE_ITEM.REJECTED, error })
    }
}

function * uploadFileSaga( fileUri, fileStorageRef ){
    try{
        let fetchAction = yield call(fetch, fileUri)
        const blob = yield fetchAction.blob()
        const task = yield call(
            rsf.storage.uploadFile,
            fileStorageRef,
            blob
        )
        yield task
    } catch (error) {
        throw error
    }
}

function * clearOutdatedItemsSaga ( itemsCollectionRef ) {
    const user = yield select(state => state.user.user)
    var time = new Date();
    time.setSeconds(time.getSeconds() - 60);
    try{
        const snapshot = yield call(
            rsf.firestore.getCollection,
            itemsCollectionRef.where("updatedAt", "<", time)
        )
        yield snapshot.docs.map(item => call(rsf.firestore.deleteDocument, itemsCollectionRef.doc(item.id)))

    } catch(error){
        throw error
    }
}

function * updateDocSaga ( docRef, fields, mergeBool=true ) {
    try{
        yield call(
            rsf.firestore.setDocument,
            docRef,
            fields,
            { merge: mergeBool }
        )
    } catch(error){
        throw error
    }
}

export default function * rootSaga () {
  yield [
    takeEvery(kernelActionTypes.ADD_TEXT_ITEM.REQUESTED, addTextItemSaga),
    takeEvery(kernelActionTypes.ADD_FILE_ITEM.REQUESTED, addFileItemSaga),
    takeEvery(kernelActionTypes.ADD_IMAGE_ITEM.REQUESTED, addImageItemSaga),
  ]
}
