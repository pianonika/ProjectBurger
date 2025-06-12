import { IngredientModel } from '@models/ingredient-model.model';

export const SET_CURR_INGREDIENT = 'SET_CURR_INGREDIENT' as const;
export const REMOVE_CURR_INGREDIENT = 'REMOVE_CURR_INGREDIENT' as const;

export interface ISetCurrIngredient {
	readonly type: typeof SET_CURR_INGREDIENT;
	readonly payload: IngredientModel;
}
export interface IRemoveCurrIngredient {
	readonly type: typeof REMOVE_CURR_INGREDIENT;
}

export type TChosenIngredientActions =
	| ISetCurrIngredient
	| IRemoveCurrIngredient;
