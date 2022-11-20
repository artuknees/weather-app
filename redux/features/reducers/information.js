import { createReducer, current } from '@reduxjs/toolkit';
import { setGeneralData , setDayOrNight } from '../actions/information';


const initialState = {
  generalData: {},
  dayOrNight: '',
}; 

export const informationReducer = createReducer(initialState, builder => {
  builder
    .addCase(setGeneralData, (state, action) => {
      state.generalData = action.payload;
    })
    .addCase(setDayOrNight, (state, action) => {
      state.dayOrNight = action.payload;
    })

});