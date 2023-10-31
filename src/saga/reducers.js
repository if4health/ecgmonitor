import {createSlice} from '@reduxjs/toolkit';

const initialState = {
    monitorData: undefined,
    selectedEcg: undefined,
    newValues: [],
    newTimer: 2
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
        resetNewValues: (state) => ({
           ...state,
           newTimer: 2,
           newValues: []
        })
    },
});

export const monitorActions = monitorSlice.actions;

export default monitorSlice.reducer;