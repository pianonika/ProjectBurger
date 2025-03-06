import { combineReducers } from '@reduxjs/toolkit';
import { currIngredientReducer } from '../../services/chosen-ingredient/reducer.js';

export const rootReducer = combineReducers({
	currIngredient: currIngredientReducer,
});
