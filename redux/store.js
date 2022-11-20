import { Action, configureStore, ThunkAction } from '@reduxjs/toolkit';
import { informationReducer } from './features/reducers/information';

export const store = configureStore({
    reducer: {
        information: informationReducer
    },
});