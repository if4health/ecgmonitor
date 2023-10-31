
export const getValuesFromData = (xIndex, ecgHeartRateValues, step) => {
    const xArr = [];
    const ecgHeartRateArr = [];
    for (let i = 0; i < step; i++) {
        const dataIndex = (xIndex + i);
        const x = xIndex + i;
        xArr.push(x);
        ecgHeartRateArr.push(Number(ecgHeartRateValues[dataIndex]));
    }
    return {
        xArr,
        ecgHeartRateArr,
        xIndex
    };
};