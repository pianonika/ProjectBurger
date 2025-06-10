import { ingredientsCategories } from '../../store/vars';
import { request } from '@utils/checkResponse';
import { REMOVE_CURR_INGREDIENT } from '@store/chosen-ingredient/action';
import {IngredientModelUnic} from "@models/ingredient-model.model";

export const GET_INGREDIENTS = 'GET_INGREDIENTS' as const;
export const GET_INGREDIENTS_FAILED = 'GET_INGREDIENTS_FAILED' as const;
export const GET_INGREDIENTS_SUCCESS = 'GET_INGREDIENTS_SUCCESS' as const;
export const INCREMENT_INGREDIENTS_COUNT =
	'INCREMENT_INGREDIENTS_COUNT' as const;
export const DECREMENT_INGREDIENTS_COUNT =
	'DECREMENT_INGREDIENTS_COUNT' as const;

export interface IGetIngredients {
	readonly type: typeof GET_INGREDIENTS;
}
export interface IGetIngredientsSuccess {
	readonly type: typeof GET_INGREDIENTS_FAILED;
}
export interface IGetIngredientsFailed {
	readonly type: typeof GET_INGREDIENTS_SUCCESS;
	readonly payload: any;
}
export interface IIncrementIngredientsCount {
	readonly type: typeof INCREMENT_INGREDIENTS_COUNT;
	readonly payload: IngredientModelUnic;
}
export interface IDegredientsIngredientsCount {
	readonly type: typeof DECREMENT_INGREDIENTS_COUNT;
	readonly payload: IngredientModelUnic;
}

export function getIngredients() {
	return function (dispatch) {
		dispatch({
			type: GET_INGREDIENTS,
		});

		request('/api/ingredients')
			.then((res) => {
				const ingredients = ingredientsConstructor(res);
				dispatch({
					type: GET_INGREDIENTS_SUCCESS,
					payload: {
						filtred: ingredients,
						defaultList: defaultListConstructor(res.data),
					},
				});
			})
			.catch((err) => {
				dispatch({
					type: GET_INGREDIENTS_FAILED,
				});
			});
	};
}

const defaultListConstructor = (data) => {
	let newData = {};
	!!data.length &&
		data.map((item) => {
			newData[item._id] = item;
		});
	return newData;
};

const ingredientsConstructor = (res) => {
	const data = new Object();
	Object.keys(ingredientsCategories).forEach((key) => {
		data[key] = [];
	});
	res.data.forEach((item) => {
		item.count = 0;
		data[item.type].push(item);
	});

	return data;
};

export type TIngredientsActions =
	| IGetIngredients
	| IGetIngredientsSuccess
	| IGetIngredientsFailed
	| IIncrementIngredientsCount
	| IDegredientsIngredientsCount;
