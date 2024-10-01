import { all, put } from 'redux-saga/effects';
import { monitorActions } from './reducers';
import {call, takeLatest} from "@redux-saga/core/effects";
import {getBpm, getResultById} from "../services/service";
import store from "./store";
function* getAllData({payload}) {
    try {
        const monitorData = yield call(getResultById, payload.time);
        const bpmValues = yield call(getBpm, monitorData.data[0].data);
        const lowerLimit = monitorData.data[0].lowerLimit;
        const upperLimit = monitorData.data[0].upperLimit;
        const yRange = {
            lowerLimit: lowerLimit,
            upperLimit: upperLimit
        }
        if(payload?.typeCode) {
            yield put(monitorActions.setSelectedEcg(monitorData.data.filter(item => item?.code.includes(payload?.typeCode))[0]))
        } else {
            yield put(monitorActions.setSelectedEcg(monitorData?.data[0]))
        }
        yield put(monitorActions.setBpmValues(bpmValues));
        yield put(monitorActions.setMonitorData(monitorData?.data))
        yield put(monitorActions.setVisibleRange(yRange))
    } catch (err) {
        console.log(err.response.data.error.message);
    }
}

function* setNewValues({payload}) {
    try {
        const monitorData = yield call(getResultById, store.getState().newTimer);
        const data = monitorData.data.filter(item => item?.code.includes(payload?.typeCode))[0]?.data;
        yield put(monitorActions.setNewValuesData(data.split(" ")))
    } catch (err) {
        console.log(err.response.data.error.message);
    }
}

function* updateBpm({payload}) {
    try {
        yield put(monitorActions.setBpmNumber(payload))
    } catch (err) {
        console.log(err);
    }
}

function* watchMonitor() {
    yield takeLatest(monitorActions.getAllData.type, getAllData)
    yield takeLatest(monitorActions.setNewValues.type, setNewValues)
    yield takeLatest(monitorActions.updateBpm.type, updateBpm)
}

export function* rootSaga() {
    yield all([watchMonitor()]);
}