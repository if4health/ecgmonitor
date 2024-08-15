import axios from 'axios';

const ApiClient = axios.create({
    // baseURL: "http://cloudecg-env.eba-mau7x2gw.us-east-1.elasticbeanstalk.com/baseR4/"
    baseURL: "http://127.0.0.1:3000/baseR4/"
})

export const getResultById = async (time) => {
    return await ApiClient.get(`Observation/66105237c24abe3ae716dc2c/data/${time}`).then(res => res);
}

export const getResultByIdAndIntervalMinutes = async (time) => {
    return await ApiClient.get(`Observation/66105237c24abe3ae716dc2c/data/${time}/${time + 1}`).then(res => res);
}

// export const getResultById = async (time) => {
//     return new Promise((resolve) => {
//         setTimeout(async () => {
//             try {
//                 const response = await ApiClient.get(`Observation/66105237c24abe3ae716dc2c/data/${time}`);

//                 const bpm = await axios.post("http://127.0.0.1:8000/run_script/direct/params", {
//                     "scriptName": "calcBPM.py",
//                     "params": response.data[0].data
//                 });

//                 console.log(bpm.data);

//                 resolve(response);
//             } catch (error) {
//                 resolve({ error: true, message: 'Erro na requisição' });
//             }
//         }, 5000); // Simula um atraso de 5 segundos
//     });
// }

const getBPMByResult = async (params) => {
    return await axios.post("http://127.0.0.1:8000/run_script/direct/params", {
        "scriptName": "calcBPM.py",
        "params": params
    }).then(res => res);
}

const getRPEAKSByResult = async (params) => {
    return await axios.post("http://127.0.0.1:8000/run_script/direct/params", {
        "scriptName": "calcRPEAKS.py",
        "params": params
    }).then(res => res);
}

// export const getBpm = (params) => {
//     return {
//         rpeak: getRPEAKSByResult(params).data.split(' ').map(Number),
//         bpm: getBPMByResult(params).data.split(' ').map(Number)
//     }
// }


export const getBpm = async (params) => {
    const rpeakResponse = await getRPEAKSByResult(params);
    const bpmResponse = await getBPMByResult(params);

    const rpeaks = rpeakResponse.data.split(' ').map(Number);
    const bpms = bpmResponse.data.split(' ').map(Number);

    const lastRpeak = rpeaks[-1];
    const lastBpm = bpms[-1];

    return {
        rpeak: rpeaks,
        bpm: bpms
    }
}

// req.data[0].data

// export const getBpm = async () => {
//     return {
//         rpeak: [184, 591, 867, 1142, 1428, 1723, 2011, 2278, 2546, 2819, 3095],
//         bpm: [61.4677919, 69.95919239, 77.44359988, 75.76342302, 74.58160484, 76.3730718, 78.83196378, 80.20559015, 79.32625454, 78.54753942]
//     };
// }

