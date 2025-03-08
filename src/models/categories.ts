import { IngredientModel } from './ingredient-model.model';

export interface Categories {
	[key: string]: string;
}

export interface ingredientceInitialState {
	items: { [key: string]: IngredientModel[] };
	itemsRequest: boolean;
	itemsFailed: boolean;
}
