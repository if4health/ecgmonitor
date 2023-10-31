import React, {useEffect, useRef, useState} from "react";
import {
    CategoryAxis,
    EllipsePointMarker,
    ENumericFormat,
    FastLineRenderableSeries,
    NumberRange,
    NumericAxis,
    SciChartSurface,
    XyDataSeries,
} from "scichart";

import {Button, ChartWrapper, VitalSigns} from "../styles";
import {getValuesFromData} from "../utils";
import {useDispatch, useSelector} from "react-redux";
import {monitorActions} from "../saga/reducers";

const drawExample = async (
    ecgHeartRateValues,
    chartElementId,
    step,
    timerTimeoutMs,
    strokeThickness,
    gapPoints,
    pointsLoop,
    currentPoint
) => {
    const { sciChartSurface, wasmContext } = await SciChartSurface.create(chartElementId);
    const xAxis = new CategoryAxis(wasmContext, {
        visibleRange: new NumberRange(0, pointsLoop),
        isVisible: false,
        labelFormat: ENumericFormat.NoFormat,
        autoTicks: false,
        minorDelta: 10,
        majorDelta:50
    });
    sciChartSurface.xAxes.add(xAxis);

    // Create multiple y-axis, one per trace. Using the stacked vertically layout strategy
    const yAxisHeartRate = new NumericAxis(wasmContext, {
        id: `yHeartRate-${chartElementId}`,
        visibleRange: new NumberRange(800, 1300),
        isVisible: false
    });

    // sciChartSurface.layoutManager!.rightOuterAxesLayoutStrategy = new RightAlignedOuterVerticallyStackedAxisLayoutStrategy();
    sciChartSurface.yAxes.add(yAxisHeartRate);

    const fifoSweepingGap = gapPoints;
    const dataSeries1 = new XyDataSeries(wasmContext, {
        fifoCapacity: pointsLoop,
        fifoSweeping: true,
        fifoSweepingGap
    });

    const pointMarkerOptions = {
        width: 7,
        height: 7,
        strokeThickness: 2,
        fill: 'black',
        lastPointOnly: true
    };
    sciChartSurface.renderableSeries.add(
        new FastLineRenderableSeries(wasmContext, {
            yAxisId: yAxisHeartRate.id,
            strokeThickness: strokeThickness,
            stroke: 'green',
            dataSeries: dataSeries1,
            pointMarker: new EllipsePointMarker(wasmContext, { ...pointMarkerOptions, stroke: 'green' })
        })
    );

    let timerId;

    const runUpdateDataOnTimeout = (newData) => {
        const { xArr, ecgHeartRateArr } = getValuesFromData(
            currentPoint,
            newData,
            step
        );

        currentPoint += step;
        dataSeries1.appendRange(xArr, ecgHeartRateArr);
        if (ecgHeartRateArr.includes(NaN)) {
            handleStop();
        } else {
            timerId = setTimeout(() => runUpdateDataOnTimeout(newData), timerTimeoutMs);
        }
    };

    const handleStop = (setStopRequest) => {
        if (setStopRequest) {
            setStopRequest(true);
        }
        clearTimeout(timerId);
        timerId = undefined;
    };

    const handleStart = (newData) => {
        let concatData = ecgHeartRateValues
        if (newData) {
            concatData = [...ecgHeartRateValues, ...newData]
        }
        runUpdateDataOnTimeout(concatData);
    };

    return { sciChartSurface, wasmContext, controls: { handleStart, handleStop }, dataSeries1 };
};




const Avr = ({chartElementId, step, timerTimeoutMs, strokeThickness, gapPoints, pointsLoop, currentPoint, openState, setStatePosition, isSomeOneOpened, update} ) => {
    const sciChartSurfaceRef = useRef();
    const [contextControls, setContextControls] = useState()
    const newValues = useSelector(state => state.newValues)
    const newTimer = useSelector(state => state.newTimer)
    const dispatch = useDispatch();
    const controlsRef = useRef();
    const [openScreen, setOpenScreen] = useState();
    const [reset, setReset] = useState(false);
    const [testInterval, setTestInterval] = useState();
    const [stopRequest, setStopRequest] = useState(false);

    useEffect(() => {
        if(newValues?.length) {
            contextControls.handleStop(setStopRequest)
            contextControls.handleStart(newValues)
        }
    }, [newValues])

    useEffect(() => {
        if (!stopRequest) return;
        clearInterval(testInterval);
        setStopRequest(false);
    }, [stopRequest])

    useEffect(() => {
        setOpenScreen(update.split(" "))
        setTestInterval(setInterval(() => {
            dispatch(monitorActions.setNewValues({ typeCode: chartElementId, time: newTimer }))
        }, 40000));
        return () => {
            dispatch(monitorActions.resetNewValues())
            clearInterval(testInterval);
        }

    }, [chartElementId]);
    useEffect(() => {
        if(!reset) return;
        dispatch(monitorActions.resetNewValues())
        clearInterval(testInterval);
        setTestInterval(setInterval(() => {
            dispatch(monitorActions.setNewValues({ typeCode: chartElementId, time: newTimer }))
        }, 40000));
        setOpenScreen(update.split(" "))
        setReset(false)
    }, [reset]);

    const openInAllScreen = () => {
        setStatePosition(chartElementId)
    }

    useEffect(() => {
        if (!openScreen?.length) return;
        let autoStartTimerId;

        const chartInitializationPromise = drawExample(
            openScreen,
            chartElementId,
            step,
            timerTimeoutMs,
            strokeThickness,
            gapPoints,
            pointsLoop,
            currentPoint
        ).then(res => {
            sciChartSurfaceRef.current = res.sciChartSurface;
            controlsRef.current = res.controls;
            setContextControls(res.controls)
            autoStartTimerId = setTimeout(res.controls.handleStart, 0);
        });
        // Delete sciChartSurface on unmount component to prevent memory leak
        return () => {
            // check if chart is already initialized
            if (sciChartSurfaceRef.current) {
                clearTimeout(autoStartTimerId);
                controlsRef.current.handleStop();
                sciChartSurfaceRef.current.delete();
                return;
            }

            // else postpone deletion
            chartInitializationPromise.then(() => {
                clearTimeout(autoStartTimerId);
                controlsRef.current.handleStop();
                sciChartSurfaceRef.current.delete();
            });
        };
    }, [openScreen]);

    return (
        openScreen ?
            <>
                <ChartWrapper isSomeOneOpened={isSomeOneOpened} onClick={() => openInAllScreen()} openScreen={openState(chartElementId)} >
                    <VitalSigns id={chartElementId}/>
                </ChartWrapper>
                <Button onClick={() => {
                    dispatch(monitorActions.getAllData({time: 1, typeCode: chartElementId}))
                    setReset(true);
                }
                }>Resetar Monitor</Button>
            </>

               : <></>
    );
}

export default Avr;
