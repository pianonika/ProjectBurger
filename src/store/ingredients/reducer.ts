import {
	DECREMENT_INGREDIENTS_COUNT,
	GET_INGREDIENTS,
	GET_INGREDIENTS_FAILED,
	GET_INGREDIENTS_SUCCESS,
	IDecrementIngredientsCount,
	IIncrementIngredientsCount,
	INCREMENT_INGREDIENTS_COUNT,
	TIngredientsActions,
} from './action';
import {
	IngredientModel,
	IngredientModelUnic,
} from '@models/ingredient-model.model';

export const initialState: TIngredients = {
	items: { bun: [], sauce: [], main: [] },
	defaultList: {},
	itemsRequest: false,
	itemsFailed: false,
};
export type TItemsByCategory = {
	bun: IngredientModelUnic[];
	sauce: IngredientModelUnic[];
	main: IngredientModelUnic[];
};

export type TIngredients = {
	items: TItemsByCategory;
	defaultList: { [key: string]: IngredientModel[] };
	itemsRequest: false;
	itemsFailed: false;
};

export const ingredientsReducer = (
	state = initialState,
	action: TIngredientsActions
) => {
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
			const newItems = calcIncrementItems(state.items, action);

			return {
				...state,
				items: { ...newItems },
			};
		}
		case DECREMENT_INGREDIENTS_COUNT: {
			const newItems = calcDecrementItems(state.items, action);

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

export const calcIncrementItems = (
	data: TItemsByCategory,
	action: IIncrementIngredientsCount
) => {
	const newItems = { bun: [], sauce: [], main: [] };
	Object.entries(data).map(([key, items]) => {
		if (items?.length) {
			newItems[key] = items.map((item) => {
				const isBun = action.payload.type === 'bun';
				return item._id === action.payload._id
					? { ...item, count: isBun ? 2 : item.count ? ++item.count : 0 }
					: item._id !== action.payload._id && isBun
					? { ...item, count: 0 }
					: item;
			});
		}

		return items;
	});
	return newItems;
};

export const calcDecrementItems = (
	data: TItemsByCategory,
	action: IDecrementIngredientsCount
) => {
	const newItems = { bun: [], sauce: [], main: [] };
	Object.entries(data).map(([key, items]) => {
		if (key === action.payload.type && items) {
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
	return newItems;
};
