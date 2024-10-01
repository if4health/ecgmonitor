import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { Container, Button, ButtonContainer } from './styles';
import { ContainerEcg } from './styles';
import previous from '../assets/previous.jpg';
import next from '../assets/next.jpg';
import CanvasJSReact from "../assets/canvasjs.react";

const { CanvasJSChart } = CanvasJSReact;

const ChartECG = ({ initialValues, dataPointsArray }) => {
    const [position, setPosition] = useState();
    const [isPrevoiusPage, setIsPreviousPage] = useState(false);
    const [interval, setInterval] = useState({ start: 0, end: 0 });
    const [chart, setChart] = useState();
    const [page, setPage] = useState(1);
    const [lastPosition, setLastPosition] = useState(0);
    const color = 'black';
    const [dps] = useState([]);
    const addDataPoints = () => {
        if (chart) {
            let pos = lastPosition;
            for (let i = lastPosition; i < initialValues; i += 1) {
                dps.push({ y: Number(dataPointsArray[i]) });
                pos += 1;
            }
            setInterval((prevState) => ({
                ...prevState,
                end: dps.length - 1,
            }));
            setPosition(dps[dps.length - 1].y);
            setLastPosition(pos);
            chart.render();
        }
    };

    const handleChange = (pageChanged) => {
        if (page > pageChanged) {
            setPosition(Number(dataPointsArray[interval.start - 1]));
        } else {
            setPosition(Number(dataPointsArray[interval.end]));
        }
        setIsPreviousPage(page > pageChanged);
        setPage(pageChanged);
    };

    useEffect(() => {
        if (!chart) return;
        if (isPrevoiusPage) {
            dps.unshift({ y: position, x: interval.start - 1 });
            setInterval({ start: interval.start - 1, end: interval.end - 1 });
            dps.pop();
            chart.render();
            return;
        }
        dps.push({ y: position, x: interval.end });
        setInterval({ start: interval.start + 1, end: interval.end + 1 });
        dps.shift();
        chart.render();
    }, [page]);
    useEffect(() => {
        if (!chart) return;
        addDataPoints(chart);
    }, [dataPointsArray, chart]);

    const options = {
        theme: 'light2',
        backgroundColor: 'transparent',
        axisY: {
            maximum: 1500,
            minimum: 0,
            gridColor: color,
            gridThickness: 0,
            interval: 19,
            lineThickness: 0,
            lineColor: color,
            tickThickness: 0,
            labelFormatter() {
                return '';
            },
        },
        axisX: {
            gridColor: color,
            gridThickness: 0,
            lineThickness: 0,
            interval: 19,
            lineColor: color,
            tickThickness: 0,
            labelFormatter() {
                return '';
            },
        },
        data: [
            {
                type: 'spline',
                color: 'black',
                dataPoints: dps,
            },
        ],
    };
    return (
        <>
            <ContainerEcg id="Canvas">
                <Container id="container">
                    <div>
                        <CanvasJSChart
                            options={options}
                            onRef={(ref) => { setChart(ref); }}
                        />
                    </div>
                </Container>
            </ContainerEcg>
            <ButtonContainer>
                <Button onClick={() => handleChange(page - 1)} icon={previous} />
                <Button onClick={() => handleChange(page + 1)} icon={next} />
            </ButtonContainer>
        </>

    );
};

ChartECG.propTypes = {
    initialValues: PropTypes.arrayOf.isRequired,
    dataPointsArray: PropTypes.arrayOf.isRequired,
};

export default ChartECG;
