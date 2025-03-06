import { IngredientModel } from './ingredient-model.model';

export interface CurrIngredientState {
	ingredient: IngredientModel;
}

export interface StoreModel {
	currIngredient: CurrIngredientState;
}

