import { configureStore, getDefaultMiddleware } from '@reduxjs/toolkit';
import createSagaMiddleware from 'redux-saga';
import rootReducer from './reducers'; // Substitua pelo seu rootReducer
import {rootSaga} from "./saga";

// Crie uma instância do middleware Redux Saga
const sagaMiddleware = createSagaMiddleware();

// Configura a store com o middleware do Saga
const store = configureStore({
    reducer:  rootReducer,
    middleware: [...getDefaultMiddleware(), sagaMiddleware],
    devTools: process.env.NODE_ENV !== 'production',
});
sagaMiddleware.run(rootSaga);
export default store;