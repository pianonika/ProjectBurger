import {
	DECREMENT_INGREDIENTS_COUNT,
	GET_INGREDIENTS,
	GET_INGREDIENTS_FAILED,
	GET_INGREDIENTS_SUCCESS,
	INCREMENT_INGREDIENTS_COUNT,
} from './action.js';
import ingredientCard from "@components/ingredient-card/ingredient-card";

const initialState = {
	items: {},
	defaultList: {},
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
				items: action.payload.filtred,
				defaultList: action.payload.defaultList,
				itemsRequest: false,
				itemsFailed: false,
			};
		}
		case GET_INGREDIENTS_FAILED: {
			return { ...state, itemsRequest: false, itemsFailed: true };
		}
		case INCREMENT_INGREDIENTS_COUNT: {
			const newItems = {};
			Object.entries(state.items).map(([key, items]) => {
				newItems[key] = items.map((item) => {
					const isBun = action.payload.type === 'bun';
					return item._id === action.payload._id
						? { ...item, count: isBun ? 2 : ++item.count }
						: item._id !== action.payload._id && isBun
						? { ...item, count: 0 }
						: item;
				});
				return items;
			});
			return {
				...state,
				items: { ...newItems },
			};
		}
		case DECREMENT_INGREDIENTS_COUNT: {
			const newItems = {};
			Object.entries(state.items).map(([key, items]) => {
				if (key === action.payload.type) {
					newItems[key] = items.map((item) => {
						return item._id === action.payload._id && !!item.count
							? { ...item, count: --item.count }
							: item;
					});
				} else {
					newItems[key] = items;
				}

				return items;
			});
			return {
				...state,
				items: { ...newItems },
			};
		}
		default: {
			return state;
		}
	}
};
