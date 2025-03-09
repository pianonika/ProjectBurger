import { combineReducers } from '@reduxjs/toolkit';
import { chosenIngredientReducer } from '../../services/chosen-ingredient/reducer.js';
import { ingredientsReducer } from '../../services/ingredients/reducer';
import { cartReducer } from '../../services/cart/reducer';
import { orderReducer } from '../../services/order/reducer';

export const rootReducer = combineReducers({
	chosenIngredient: chosenIngredientReducer,
	ingredients: ingredientsReducer,
	cart: cartReducer,
	order: orderReducer,
});
