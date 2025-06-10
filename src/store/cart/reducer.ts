import {
	ADD_FILLINGS_ITEM,
	CHANGE_ITEMS_ORDER,
	CLEAR_CART,
	REMOVE_FILLINGS_ITEM,
	SET_BUN,
	TCartActions,
} from './action';

const initialState: ICartState = {
	bun: {},
	fillings: [],
};
export interface ICartState {
	bun: any;
	fillings: any;
}

export const cartReducer = (state = initialState, action: TCartActions) => {
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
					...state?.fillings?.filter((i) => i.uniqueId !== action.payload),
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
		case CLEAR_CART: {
			return {
				...state,
				bun: {},
				fillings: [],
			};
		}
		default: {
			return state;
		}
	}
};
