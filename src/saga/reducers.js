import {createSlice} from '@reduxjs/toolkit';

const initialState = {
    monitorData: undefined,
    selectedEcg: undefined,
    newValues: [],
    newTimer: 2,
    bpmState: {
        bpmNumber: 0,
        positionBpm: 0
    }
};

const monitorSlice = createSlice({
    name: 'ecgMonitor',
    initialState,
    reducers: {
        getAllData: (state) => state,
        setMonitorData: (state, {payload}) => ({
            ...state,
            monitorData: payload
        }),
        setSelectedEcg: (state, {payload}) =>  ({
            ...state,
            selectedEcg: payload
        }),
        setNewValues: (state) => state,
        setNewValuesData: (state, {payload}) => ({
            ...state,
            newValues: state.newValues.concat(payload),
            newTimer: state?.newTimer + 1
        }),
        setBpmValues: (state, {payload}) => {
           return {
            ...state,
            bpmValues: payload
        }},
        setBpmNumber: (state, {payload}) => {
            return {
                ...state,
                bpmState: {
                    bpmNumber: payload?.bpmNumber,
                    positionBpm: payload?.positionBpm,
                }
            }},
        updateBpm: (state) => state,
        resetNewValues: (state) => ({
           ...state,
           newTimer: 2,
           newValues: []
        })
    },
});

export const monitorActions = monitorSlice.actions;

export default monitorSlice.reducer;