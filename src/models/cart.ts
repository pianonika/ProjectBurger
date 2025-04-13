import { IngredientModelUnic } from './ingredient-model.model';

export interface ICartModel {
	bun: IngredientModelUnic;
	fillings: IngredientModelUnic[];
}
