import { IngredientModel } from './ingredient-model.model';

export interface Categories {
	[key: string]: string;
}

export interface ingredientceInitialState {
	items: ingredientceItems;
	itemsRequest: boolean;
	itemsFailed: boolean;
}

export interface ingredientceItems {
	[key: string]: IngredientModel[]
}
