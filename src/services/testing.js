import axios from "axios";
import {call, takeLatest} from "@redux-saga/core/effects";
import { getResultById } from "./service.js ";
import { getBpm } from "./service.js";

const req = await getResultById(1);

// const request = await axios.post("http://127.0.0.1:8000/run_script/direct/params", {
//     "scriptName": "calcBPM.py",
//     "params": req.data[0].data
// }).then(res => res);

// const requestIfCloud = request.data;
// console.log(requestIfCloud);