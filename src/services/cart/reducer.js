import { ADD_FILLINGS_ITEM, REMOVE_FILLINGS_ITEM, SET_BUN, CHANGE_ITEMS_ORDER } from './action.js';

const initialState = {
	bun: {},
	fillings: [],
};

export const cartReducer = (state = initialState, action) => {
	switch (action.type) {
		case ADD_FILLINGS_ITEM: {
			return {
				...state,
				fillings: [...state.fillings, action.payload],
			};
		}
		case REMOVE_FILLINGS_ITEM: {
			return {
				...state,
				fillings: [
					...state?.fillings?.filter((i) => i.uuid !== action.payload),
				],
			};
		}
		case CHANGE_ITEMS_ORDER: {
			return {
				...state,
				fillings: action.payload,
			};
		}
		case SET_BUN: {
			return {
				...state,
				bun: action.payload,
			};
		}
		default: {
			return state;
		}
	}
};
