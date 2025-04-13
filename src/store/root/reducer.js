import { combineReducers } from '@reduxjs/toolkit';
import { chosenIngredientReducer } from '@store/chosen-ingredient/reducer';
import { ingredientsReducer } from '@store/ingredients/reducer';
import { cartReducer } from '@store/cart/reducer';
import { orderReducer } from '@store/order/reducer';
import { authorizationReducer } from '@store/auth/reducer';

export const rootReducer = combineReducers({
	chosenIngredient: chosenIngredientReducer,
	ingredients: ingredientsReducer,
	cart: cartReducer,
	order: orderReducer,
	authorization: authorizationReducer,
});
