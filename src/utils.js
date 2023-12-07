
import {monitorActions} from "./saga/reducers";

export const getValuesFromData = (xIndex, ecgHeartRateValues, step, bpm, dispatch, bpmState) => {
    const xArr = [];
    const ecgHeartRateArr = [];
    for (let i = 0; i < step; i++) {
        const dataIndex = (xIndex + i);
        const x = xIndex + i;
        xArr.push(x);
        if (bpm?.rpeak.find(item => item === dataIndex) && bpm?.rpeak.indexOf(dataIndex) > 0) {
            dispatch(monitorActions.updateBpm({bpmNumber: bpm?.bpm[bpm?.rpeak.indexOf(dataIndex) - 1], positionBpm: dataIndex}))
        }
        ecgHeartRateArr.push(Number(ecgHeartRateValues[dataIndex]));
    }
    return {
        xArr,
        ecgHeartRateArr,
        xIndex
    };
};