import React, {useEffect, useState} from "react";
import axios, {AxiosResponse} from 'axios';
import Avr from "./components/avr";
import {ContainerSelect, IbRow2Col2, Label, Select} from "./styles";
import {useDispatch, useSelector} from "react-redux";
import {monitorActions} from "./saga/reducers";

export default function App() {
    const dispatch = useDispatch()
    const [statePosition, setStatePosition] = useState();
    const update = useSelector(state => state.monitorData);
    const selectedEcgType = useSelector(state => state.selectedEcg);

    useEffect(() => {
        dispatch(monitorActions.getAllData({ time: 1 }))
    }, []);

    const openState = (id) => {
        if (id.includes('chart')) {
            return statePosition === id
        }
        setStatePosition('container');
    }

    return (
        update ?
        <div id="container" onClick={(e) => openState(e?.target?.id)} style={{ position: "relative", height: '80vh' }}>
            <div id="containerChart" onClick={(e) => openState(e?.target?.id)} style={{ position: 'relative', display: 'flex', flexFlow: 'wrap', justifyContent: 'flex-end', height: '80vh' }}>
                {selectedEcgType?.data && selectedEcgType?.code && <Avr
                    update={selectedEcgType.data}
                    isSomeOneOpened={statePosition?.includes('chart')}
                    setStatePosition={setStatePosition} openState={openState}
                    currentPoint={0} chartElementId={`${selectedEcgType?.code}`}
                    step={10}
                    timerTimeoutMs={selectedEcgType?.period * 10}
                    strokeThickness={5}
                    gapPoints={20}
                    pointsLoop={2000}/>}
            </div>
            <ContainerSelect>
                <Label>Selecione a variação do exame</Label>
                <Select onChange={(event) => dispatch(monitorActions.getAllData({ time: 1, typeCode: event?.target?.value }))}>
                    {update?.map(item => {
                        return(
                            <option value={`${item.code}`}>{item.code}</option>
                        )
                    })
                    }
                </Select>
            </ContainerSelect>
        </div> : <></>


    );
}