import { createSelector } from '@reduxjs/toolkit';
import { RootState } from '../store';

export const information = (state) => state.information

export const informationSelector = createSelector(information, state => state)