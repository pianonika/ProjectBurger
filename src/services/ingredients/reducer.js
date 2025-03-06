import {
	GET_ITEMS_FAILED,
	GET_ITEMS_REQUEST,
	GET_ITEMS_SUCCESS,
} from '@services/ingredients/action';

const initialState = {
	items: [],
	itemsRequest: false,
	itemsFailed: false,
};

export const ingredientsReducer = (state = initialState, action) => {
	switch (action.type) {
		case GET_ITEMS_REQUEST: {
			return {
				...state,
				itemsRequest: true,
			};
		}
		case GET_ITEMS_SUCCESS: {
			return {
				...state,
				items: action.items,
				itemsRequest: false,
				itemsFailed: false,
			};
		}
		case GET_ITEMS_FAILED: {
			return { ...state, itemsRequest: false, itemsFailed: true };
		}
		default: {
			return state;
		}
	}
};
