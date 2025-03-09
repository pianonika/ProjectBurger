import { IngredientModel } from './ingredient-model.model';

export interface Categories {
	[key: string]: string;
}

export interface ingredientsItems {
	[key: string]: IngredientModel[];
}
