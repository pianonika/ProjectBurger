import { IngredientModelUnic } from './ingredient-model.model';

export interface ICartModel {
	bun: IngredientModelUnic | null;
	fillings: IngredientModelUnic[] | [];
}
