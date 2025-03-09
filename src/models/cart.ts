import { IngredientModel } from './ingredient-model.model';

export interface CartModel {
	bun: IngredientModel;
	fillings: IngredientModel[];
}
