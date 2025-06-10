import { IngredientModelUnic } from '@models/ingredient-model.model';

export const ADD_FILLINGS_ITEM = 'ADD_FILLINGS_ITEM' as const;
export const REMOVE_FILLINGS_ITEM = 'REMOVE_FILLINGS_ITEM' as const;
export const SET_BUN = 'SET_BUN' as const;
export const CHANGE_ITEMS_ORDER = 'CHANGE_ITEMS_ORDER' as const;
export const CLEAR_CART = 'CLEAR_CART' as const;

export interface IAddFillingsAction {
	readonly type: typeof ADD_FILLINGS_ITEM;
	readonly payload: IngredientModelUnic[];
}
export interface IRemoveFillingsAction {
	readonly type: typeof REMOVE_FILLINGS_ITEM;
	readonly payload: string;
}
export interface ISetBunAction {
	readonly type: typeof SET_BUN;
	readonly payload: IngredientModelUnic;
}
export interface IChangeItemsOrderAction {
	readonly type: typeof CHANGE_ITEMS_ORDER;
	readonly payload: IngredientModelUnic[];
}
export interface IClearCartAction {
	readonly type: typeof CLEAR_CART;
}

export type TCartActions =
	| IAddFillingsAction
	| IRemoveFillingsAction
	| ISetBunAction
	| IChangeItemsOrderAction
	| IClearCartAction;
