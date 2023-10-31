import axios from 'axios';

const ApiClient = axios.create({
    baseURL: "http://cloudecg-env.eba-mau7x2gw.us-east-1.elasticbeanstalk.com/baseR4/"
})

export const getResultById = async (time) => {
    return await ApiClient.get(`Observation/652de4cf2879d3153161c108/data/${time}`).then(res => res);
}