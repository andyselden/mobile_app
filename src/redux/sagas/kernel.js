import { all, call, fork, put, select, take, takeEvery, actionChannel, race } from 'redux-saga/effects'
import { delay } from 'redux-saga'
import { kernelActionTypes, alertDropdownActionTypes } from '../constants/actionTypes'
import firebase from 'firebase'
import rsf from '../rsf'
import shortid from 'shortid'

function * addTextItemSaga (action) {
    try{
        const user = yield select(state => state.user.user)

        //Get most recent items from kernel
        const snapshot = yield call(rsf.firestore.getDocument, firebase.firestore().collection('kernels').doc(user.uid))
        let { items } = (snapshot.exists && 'items' in snapshot.data()) ? snapshot.data() : { items: [] }
        const updatedAt = (snapshot.exists && 'updatedAt' in snapshot.data()) ? snapshot.data().updatedAt.toDate() : { updatedAt: new Date('December 17, 1995 03:24:00') }

        //Clear out items over 1 min old
        if(items && items.length){
             items = yield call(clearItemsIfOutdated, items, updatedAt)
        }

        //Add text item
        items.push({
            itemType: 'TEXT',
            text: action.text,
         })

         //Push new kernel to firestore
         const { latitude, longitude } = yield select(state => state.locationBrowser.location)
         const userDisplayName = user.displayName ? user.displayName : user.email
         yield call(
            rsf.firestore.setDocument,
            firebase.firestore().collection('kernels').doc(user.uid),
            {
                 userDisplayName: userDisplayName,
                 updatedAt: new firebase.firestore.FieldValue.serverTimestamp(),
                 location: new firebase.firestore.GeoPoint(latitude, longitude),
                 items: items
             }
        )

        const successMessage = 'text is done uploading'
        const timerIsRunning = yield select(state => state.kernel.timerIsRunning)
        if(timerIsRunning){
            yield put({ type: kernelActionTypes.TIMER.RESET })
        } else {
            yield put({ type: kernelActionTypes.TIMER.START })
        }
        yield put({ type: kernelActionTypes.UPDATE_KERNEL_ITEMS, items })
        yield put({ type: kernelActionTypes.ADD_TEXT_ITEM.FULFILLED })
        // Send dropdown alert
        const timestamp = Date.now()
        const alertType =  "SUCCESS"
        const title = "text added to your kernel!"
        const message = "testing"
        yield put({
            type: alertDropdownActionTypes.ALERT_USER,
            timestamp: timestamp,
            alertType: alertType,
            title: title,
            message: message
        })

    } catch (error) {
        yield put({ type: kernelActionTypes.ADD_TEXT_ITEM.REJECTED, error })
    }
}



function * addFileItemSaga (action) {
    try{
        // Send dropdown alert
        yield put({
            type: alertDropdownActionTypes.ALERT_USER,
            timestamp: Date.now(),
            alertType: "INFO",
            title: action.fileName + " is uploading..",
            message: ''
        })

        const user = yield select(state => state.user.user)

        //Get unique id for file
        //Idea is to retain original file name while not conflicting with other files
        const shortId = shortid.generate()

        //Upload file blob
        yield call(
            uploadFileSaga,
            action.uri,
            `items/${ user.uid }/${ shortId }/${ action.fileName }`
        )

        //Get most recent items from kernel
        const snapshot = yield call(rsf.firestore.getDocument, firebase.firestore().collection('kernels').doc(user.uid))
        let { items } = (snapshot.exists && 'items' in snapshot.data()) ? snapshot.data() : { items: [] }
        const updatedAt = (snapshot.exists && 'updatedAt' in snapshot.data()) ? snapshot.data().updatedAt.toDate() : { updatedAt: new Date('December 17, 1995 03:24:00') }

        //Clear out items over 1 min old
        if(items && items.length){
             items = yield call(clearItemsIfOutdated, items, updatedAt)
        }

        //Add file item
        items.push({
                itemType: 'FILE',
                fileReference: `items/${ user.uid }/${ shortId }/${ action.fileName }`,
                fileName: action.fileName,
         })

         //Push new kernel to firestore
         const { latitude, longitude } = yield select(state => state.locationBrowser.location)
         const userDisplayName = user.displayName ? user.displayName : user.email
         yield call(
            rsf.firestore.setDocument,
            firebase.firestore().collection('kernels').doc(user.uid),
            {
                 userDisplayName: userDisplayName,
                 updatedAt: new firebase.firestore.FieldValue.serverTimestamp(),
                 location: new firebase.firestore.GeoPoint(latitude, longitude),
                 items: items
             }
        )

        const successMessage = `${ action.fileName } is finished uploading to around you`
        const timerIsRunning = yield select(state => state.kernel.timerIsRunning)
        if(timerIsRunning){
            yield put({ type: kernelActionTypes.TIMER.RESET })
        } else {
            yield put({ type: kernelActionTypes.TIMER.START })
        }
        yield put({ type: kernelActionTypes.UPDATE_KERNEL_ITEMS, items })
        yield put({ type: kernelActionTypes.ADD_IMAGE_ITEM.FULFILLED })

        // Send dropdown alert
        yield put({
            type: alertDropdownActionTypes.ALERT_USER,
            timestamp: Date.now(),
            alertType: "SUCCESS",
            title: action.fileName + " is uploaded!",
            message: ''
        })
    } catch (error) {
        yield put({ type: kernelActionTypes.ADD_IMAGE_ITEM.REJECTED, error })
    }
}

function * addImageItemSaga (action) {
    try{

        // Send dropdown alert
        yield put({
            type: alertDropdownActionTypes.ALERT_USER,
            timestamp: Date.now(),
            alertType: "INFO",
            title: action.fileName + " is uploading...",
            message: ''
        })

        const user = yield select(state => state.user.user)

        //Get unique id for file
        //Idea is to retain original file name while not conflicting with other files
        const shortId = shortid.generate()

        //Upload file blob
        yield call(
            uploadFileSaga,
            action.uri,
            `items/${ user.uid }/${ shortId }/${ action.fileName }`
        )

        //Get most recent items from kernel
        const snapshot = yield call(rsf.firestore.getDocument, firebase.firestore().collection('kernels').doc(user.uid))
        let { items } = (snapshot.exists && 'items' in snapshot.data()) ? snapshot.data() : { items: [] }
        const updatedAt = (snapshot.exists && 'updatedAt' in snapshot.data()) ? snapshot.data().updatedAt.toDate() : { updatedAt: new Date('December 17, 1995 03:24:00') }

        //Clear out items over 1 min old
        if(items && items.length){
             items = yield call(clearItemsIfOutdated, items, updatedAt)
        }

        //Add image item
        items.push({
                itemType: 'IMAGE',
                fileReference: `items/${ user.uid }/${ shortId }/${ action.fileName }`,
                fileName: action.fileName,
         })

         //Push new kernel to firestore
         const { latitude, longitude } = yield select(state => state.locationBrowser.location)
         const userDisplayName = user.displayName ? user.displayName : user.email
         yield call(
            rsf.firestore.setDocument,
            firebase.firestore().collection('kernels').doc(user.uid),
            {
                 userDisplayName: userDisplayName,
                 updatedAt: new firebase.firestore.FieldValue.serverTimestamp(),
                 location: new firebase.firestore.GeoPoint(latitude, longitude),
                 items: items
             }
        )

        const successMessage = `${ action.fileName } is finished uploading to around you`
        const timerIsRunning = yield select(state => state.kernel.timerIsRunning)
        if(timerIsRunning){
            yield put({ type: kernelActionTypes.TIMER.RESET })
        } else {
            yield put({ type: kernelActionTypes.TIMER.START })
        }
        yield put({ type: kernelActionTypes.UPDATE_KERNEL_ITEMS, items })
        yield put({ type: kernelActionTypes.ADD_IMAGE_ITEM.FULFILLED })


        // Send dropdown alert
        yield put({
            type: alertDropdownActionTypes.ALERT_USER,
            timestamp: Date.now(),
            alertType: "SUCCESS",
            title: action.fileName + " is uploaded!",
            message: ''
        })
    } catch (error) {
        yield put({ type: kernelActionTypes.ADD_IMAGE_ITEM.REJECTED, error })
    }
}



////////////////////////////////////////////////
//////////////// HELPER SAGAS //////////////////
////////////////////////////////////////////////

/*
 * This Timer Saga sets a 60 second timer to delete old items compares the time from 60
 * seconds ago with updatedAt and returns empty arr
*/
function* kernelDeletionTimerSaga() {
  const channel = yield actionChannel(kernelActionTypes.TIMER.START)
  while(yield take(channel)) {
    while(true) {
      const winner = yield race({
          stopped: take(kernelActionTypes.TIMER.STOP),
          tick: delay(1000)
      })

      const secondsToDeletion = yield select(state => state.kernel.secondsToDeletion)
      if(secondsToDeletion === 60) {

         const user = yield select(state => state.user.user)
         yield put({ type: kernelActionTypes.TIMER.STOP })
         yield put({ type: kernelActionTypes.TIMER.RESET })
        const items = yield select(state => state.kernel.items)
        yield call(clearItemsFiles, items)
        yield call(rsf.firestore.deleteDocument, firebase.firestore().collection('kernels').doc(user.uid))
         break

      } else if (!winner.stopped) {
        yield put({ type: kernelActionTypes.TIMER.TICK })

      } else {
        break
      }

  }
}
}

/*
 * This helper function compares the time from 60
 * seconds ago with updatedAt and returns empty arr
*/
function* clearItemsIfOutdated( items, updatedAt ) {
    let timeMinusOneMin = new Date()
    timeMinusOneMin.setSeconds(timeMinusOneMin.getSeconds() - 60)

    if(timeMinusOneMin > updatedAt){
	    yield call(clearItemsFiles, items)
        return []
    }
    return items
}

function* clearItemsFiles( items ){
    const fileRefItems = items.filter(item => (item.itemType == 'IMAGE' || item.itemType == 'FILE'))
	yield all(fileRefItems.map(item => call(deleteFileWrapperSaga, item.fileReference)))
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

function* deleteFileSaga( filePath ){
    try{
        yield call(rsf.storage.deleteFile, filePath);
    }catch(error) {
        console.log(error)
    }
}

function* deleteFileWrapperSaga(filePath) {
	const task = yield fork(deleteFileSaga, filePath);

    const { error } = yield race({
	//	success: take(SUCCESS),
		error: console.log(error),
	})

	if(error) {
		yield cancel(task)

	}
}

export default function * rootSaga () {
  yield fork(kernelDeletionTimerSaga)
  yield all([
    takeEvery(kernelActionTypes.ADD_TEXT_ITEM.REQUESTED, addTextItemSaga),
    takeEvery(kernelActionTypes.ADD_FILE_ITEM.REQUESTED, addFileItemSaga),
    takeEvery(kernelActionTypes.ADD_IMAGE_ITEM.REQUESTED, addImageItemSaga),
  ])
}
