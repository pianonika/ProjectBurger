export interface IngredientModel {
	_id: string;
	name: string;
	type?: string;
	proteins?: number;
	fat?: number;
	carbohydrates?: number;
	calories?: number;
	price: number;
	image: string;
	image_mobile?: string;
	image_large?: string;
	__v?: number;
	uuid?: string;
	count: number;
}
export interface IngredientModelUnic extends IngredientModel {
	uniqueId?: string;
}
