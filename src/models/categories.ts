import { IngredientModel } from './ingredient-model.model';
import { Dispatch, SetStateAction } from 'react';

export interface Categories {
	[key: string]: string;
}

export interface ingredientsItems {
	[key: string]: IngredientModel[];
}

export enum IingredientsCategories {
	bun = 'Булки',
	sauce = 'Соусы',
	main = 'Начинки',
}
export interface ITabsProps {
	currSection: string;
	updateCurrentSection: Dispatch<SetStateAction<string>>;
}
