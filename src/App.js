import React, {useEffect, useState} from "react";
import Dynamic from "./components/dynamic";
import {ContainerBpm, ContainerSelect, Label, Select} from "./styles";
import {useDispatch, useSelector} from "react-redux";
import {monitorActions} from "./saga/reducers";
import {ButtonGroup, ButtonSelect, Page} from "./components/styles";
import ChartECG from "./components/static";

export default function App() {
    const dispatch = useDispatch()
    const [initialValues] = useState(1500);
    const [statePosition, setStatePosition] = useState();
    const update = useSelector(state => state.monitorData);
    const selectedEcgType = useSelector(state => state.selectedEcg);
    const bpmState = useSelector(state => state?.bpmState)
    const [showDynamic, setShowDynamic] = useState(true)

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
            <>
                {showDynamic ? <div id="container" onClick={(e) => openState(e?.target?.id)} style={{ position: "relative", height: '80vh' }}>
                     <div id="containerChart" onClick={(e) => openState(e?.target?.id)} style={{ position: 'relative', display: 'flex', flexFlow: 'wrap', justifyContent: 'flex-end', height: '80vh' }}>
                {selectedEcgType?.data && selectedEcgType?.code && <Dynamic
                    update={selectedEcgType.data}
                    isSomeOneOpened={statePosition?.includes('chart')}
                    setStatePosition={setStatePosition} openState={openState}
                    currentPoint={0} chartElementId={`${selectedEcgType?.code}`}
                    step={10}
                    timerTimeoutMs={selectedEcgType?.period * 10}
                    strokeThickness={5}
                    gapPoints={20}
                    pointsLoop={2000}
                    bpmState={bpmState}
                />}
                <ContainerBpm>
                    <span>{Math.round(bpmState?.bpmNumber)}</span>
                    <div>BPM</div>
                </ContainerBpm>
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
        </div> :  <Page>
                    <ChartECG initialValues={initialValues} dataPointsArray={selectedEcgType?.data?.split(' ')} />
                    <ChartECG initialValues={initialValues} dataPointsArray={selectedEcgType?.data?.split(' ')} />
                </Page> }
                <ButtonGroup>
                    <ButtonSelect onClick={() => setShowDynamic(true)}>Exame dinâmico</ButtonSelect>
                    <ButtonSelect onClick={() => setShowDynamic(false)}>Exame estático</ButtonSelect>
                </ButtonGroup>
            </>

            :
        <></>


    );
}