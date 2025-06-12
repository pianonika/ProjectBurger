import { Categories } from '@models/categories';

export const BASE_URL = 'https://norma.nomoreparties.space';
export const WS_URL = 'ws://norma.nomoreparties.space';

export const ingredientsCategories: Categories = {
	bun: 'Булки',
	sauce: 'Соусы',
	main: 'Начинки',
};

export const translations: { [key: string]: string } = {
	done: 'Готово',
	created: 'Создан',
};
