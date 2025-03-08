import { combineReducers } from '@reduxjs/toolkit';
import { currIngredientReducer } from '../../services/chosen-ingredient/reducer.js';
import {ingredientsReducer} from "../../services/ingredients/reducer";

export const rootReducer = combineReducers({
	currIngredient: currIngredientReducer,
	ingredients: ingredientsReducer,
});
