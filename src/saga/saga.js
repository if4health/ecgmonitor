import { all, put } from 'redux-saga/effects';
import { monitorActions } from './reducers';
import {call, takeLatest} from "@redux-saga/core/effects";
import {getResultById} from "../services/service";
import store from "./store";
function* getAllData({payload}) {
    try {
        const monitorData = yield call(getResultById, payload.time)
        if(payload?.typeCode) {
            yield put(monitorActions.setSelectedEcg(monitorData.data.filter(item => item?.code.includes(payload?.typeCode))[0]))
        } else {
            yield put(monitorActions.setSelectedEcg(monitorData?.data[0]))
        }
        yield put(monitorActions.setMonitorData(monitorData?.data))
    } catch (err) {
        console.log(err);
    }
}

function* setNewValues({payload}) {
    try {
        const monitorData = yield call(getResultById, store.getState().newTimer);
        const data = monitorData.data.filter(item => item?.code.includes(payload?.typeCode))[0]?.data;
        yield put(monitorActions.setNewValuesData(data.split(" ")))
    } catch (err) {
        console.log(err);
    }
}

function* watchMonitor() {
    yield takeLatest(monitorActions.getAllData.type, getAllData)
    yield takeLatest(monitorActions.setNewValues.type, setNewValues)
}

export function* rootSaga() {
    yield all([watchMonitor()]);
}