import {
	GET_INGREDIENTS,
	GET_INGREDIENTS_FAILED,
	GET_INGREDIENTS_SUCCESS,
} from './action.js';

const initialState = {
	items: {},
	itemsRequest: false,
	itemsFailed: false,
};


export const ingredientsReducer = (state = initialState, action) => {
	switch (action.type) {
		case GET_INGREDIENTS: {
			return {
				...state,
				itemsRequest: true,
			};
		}
		case GET_INGREDIENTS_SUCCESS: {
			return {
				...state,
				items: action.payload,
				itemsRequest: false,
				itemsFailed: false,
			};
		}
		case GET_INGREDIENTS_FAILED: {
			return { ...state, itemsRequest: false, itemsFailed: true };
		}
		default: {
			return state;
		}
	}
};
