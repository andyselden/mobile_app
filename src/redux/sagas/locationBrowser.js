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

function * getUserLocationSaga(){
    const { location } = yield call(() => Radar.trackOnce())
    yield put({ type: locationBrowserActionTypes.UPDATE_LOCATION.FULFILLED, location })
}

function * updatePermissionsSaga (action) {
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
    yield [
        takeEvery(locationBrowserActionTypes.UPDATE_PERMISSIONS.REQUESTED, updatePermissionsSaga),
        takeEvery(locationBrowserActionTypes.BACKGROUND_TRACKING_ON.REQUESTED, backgroundTrackingOnSaga),
        takeEvery(locationBrowserActionTypes.BACKGROUND_TRACKING_OFF.REQUESTED, backgroundTrackingOffSaga),
    ]
}
