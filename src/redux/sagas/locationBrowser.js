import { call, fork, put, select, takeEvery, take } from 'redux-saga/effects'
import { eventChannel, END } from 'redux-saga'
import { locationBrowserActionTypes } from '../constants/actionTypes'
import firebase from 'firebase'
import rsf from '../rsf'
import Radar from 'react-native-radar'

function * initializeRadar(){
    var permissionsStatus = yield select(state => state.locationBrowser.permissionsStatus)
    if(!permissionsStatus)
    {
        yield call(updatePermissionsSaga, {backgroundAndForegroundPermissionsRequest: true})
        permissionsStatus = yield select(state => state.locationBrowser.permissionsStatus)
    }
    if(permissionsStatus == 'GRANTED'){
        //Get Location In Foreground
        yield call(getUserLocationSaga)
        yield put({ type: locationBrowserActionTypes.INITIALIZE })
        //Turn on Background Tracking
        yield put({ type: locationBrowserActionTypes.BACKGROUND_TRACKING_ON.REQUESTED })
    }
}

  function kernelsTransformer(kernels){
  const res = []
  kernels.forEach(doc => res.push({
    id: doc.id,
    ...doc.data()
  }))
  return res
}
function * syncKernelsSaga()
{

    // Wait for user to be logged in before finding location
     yield call(waitFor, state => state.user.user != null)


    // Wait for user to be logged in before syncing kernels
     yield call(waitFor, state => state.user.user != null)

     var time = new Date();
     time.setSeconds(time.getSeconds() - 60);
     const channel = rsf.firestore.channel(firebase.firestore().collection('kernels').where("updatedAt", ">", time))
     try{
         while (true) {
             const rawData = yield take(channel)
             const kernels = kernelsTransformer(rawData)
             yield put({ type: locationBrowserActionTypes.SYNC_KERNELS, kernels })
         }
     } catch(error) {
         console.log(error)
     }
}

function * getUserLocationSaga(){

    // Wait for user to be logged in before finding location
     yield call(waitFor, state => state.user.user != null)

    state => getCurrentUser(state) != null
    const { location } = yield call(() => Radar.trackOnce())
    yield put({ type: locationBrowserActionTypes.UPDATE_LOCATION.FULFILLED, location })
}

function * updatePermissionsSaga (action) {

    // Wait for user to be logged in before requesting permission
     yield call(waitFor, state => state.user.user != null)

    try{
        Radar.requestPermissions(action.backgroundAndForegroundPermissionsRequest)
        const permissionsStatus = yield call(Radar.getPermissionsStatus)
        yield put({ type: locationBrowserActionTypes.UPDATE_PERMISSIONS.FULFILLED, permissionsStatus })
    } catch(error) {
        yield put({ type: locationBrowserActionTypes.UPDATE_PERMISSIONS.REJECTED, error })
    }
}

function backgroundLocationUpdatesChannel(){
    return eventChannel((emit) => {
        Radar.on('location', (result) => {
            emit(result)
        })

        return () => {
            Radar.off('location')
        }
    })
}

function * backgroundLocationUpdatesChannel(){
    const backgroundLocationUpdatesChan = yield call(backgroundLocationUpdatesChannel)
           try{
               while (true) {
                   const { location } = yield take(backgroundLocationUpdatesChan)
                   yield put({ type: locationBrowserActionTypes.UPDATE_LOCATION.FULFILLED, location })
               }
           } catch(error) {
               yield put({ type: locationBrowserActionTypes.UPDATE_LOCATION.REJECTED, error })
           }
}

function backgroundLocationErrorsChannel(){
    return eventChannel((emit) => {
        Radar.on('error', (error) => {
            emit(error)
        })

        return () => {
            Radar.off('error')
        }
    })
}

function * backgroundLocationErrorsChannel(){
    const backgroundLocationErrorsChan = yield call(backgroundLocationErrorsChannel)
           try{
               while (true) {
                   const { err } = yield take(backgroundLocationErrorsChan)
                   yield put({ type: locationBrowserActionTypes.UPDATE_LOCATION.REJECTED, err })
               }
           } catch(error) {
               console.log(error)
           }
}

function * backgroundTrackingOnSaga(){
    try{
        Radar.startTracking()
        yield put({ type: locationBrowserActionTypes.BACKGROUND_TRACKING_ON.FULFILLED })
    } catch(error){
        yield put({ type: locationBrowserActionTypes.BACKGROUND_TRACKING_ON.REJECTED, error })
    }
}

function * backgroundTrackingOffSaga(){
    try{
        Radar.stopTracking()
        yield put({ type: locationBrowserActionTypes.BACKGROUND_TRACKING_OFF.FULFILLED })
    } catch(error){
        yield put({ type: locationBrowserActionTypes.BACKGROUND_TRACKING_OFF.REJECTED, error })
    }
}

export default function * rootSaga () {
        const initialized = yield select(state => state.locationBrowser.initialized)
        if(!initialized) yield call(initializeRadar)
        yield fork(backgroundLocationUpdatesChannel)
        yield fork(backgroundLocationErrorsChannel)
        yield fork(syncKernelsSaga)
        yield [
            takeEvery(locationBrowserActionTypes.UPDATE_PERMISSIONS.REQUESTED, updatePermissionsSaga),
            takeEvery(locationBrowserActionTypes.BACKGROUND_TRACKING_ON.REQUESTED, backgroundTrackingOnSaga),
            takeEvery(locationBrowserActionTypes.BACKGROUND_TRACKING_OFF.REQUESTED, backgroundTrackingOffSaga),
        ]
}

//////////////////////
////Helper Functions//
//////////////////////

function* waitFor(selector) {
  if (yield select(selector)) return;

  while (true) {
    yield take('*');
    if (yield select(selector)) return;
  }
}


