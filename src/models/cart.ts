import { IngredientModelUnic } from './ingredient-model.model';

export interface CartModel {
	bun: IngredientModelUnic;
	fillings: IngredientModelUnic[];
}
