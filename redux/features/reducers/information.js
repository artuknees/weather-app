import { createReducer, current } from '@reduxjs/toolkit';
import { setGeneralData , setDayOrNight , setRequestStatus , setActualTimeIndex } from '../actions/information';


const initialState = {
  generalData: {},
  dayOrNight: '',
  requestStatus: 0,
  actualTimeIndex: 0,
}; 

export const informationReducer = createReducer(initialState, builder => {
  builder
    .addCase(setGeneralData, (state, action) => {
      state.generalData = action.payload;
    })
    .addCase(setDayOrNight, (state, action) => {
      state.dayOrNight = action.payload;
    })
    .addCase(setRequestStatus, (state, action) => {
      state.requestStatus = action.payload;
    })
    .addCase(setActualTimeIndex, (state, action) => {
      state.actualTimeIndex = action.payload;
    })

});