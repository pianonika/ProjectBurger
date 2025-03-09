import { BASE_URL, ingredientsCategories } from '../../services/vars';

export const GET_INGREDIENTS = 'GET_INGREDIENTS';
export const GET_INGREDIENTS_FAILED = 'GET_INGREDIENTS_FAILED';
export const GET_INGREDIENTS_SUCCESS = 'GET_INGREDIENTS_SUCCESS';
export const INCREMENT_INGREDIENTS_COUNT = 'INCREMENT_INGREDIENTS_COUNT';
export const DECREMENT_INGREDIENTS_COUNT = 'DECREMENT_INGREDIENTS_COUNT';

export function getIngredients() {
	return function (dispatch) {
		dispatch({
			type: GET_INGREDIENTS,
		});

		fetch(`${BASE_URL}/api/ingredients`)
			.then((res) => res.json())
			.then((res) => {
				if (res && res.success) {
					const ingredients = ingredientsConstructor(res);
					dispatch({
						type: GET_INGREDIENTS_SUCCESS,
						payload: ingredients,
					});
				} else {
					dispatch({
						type: GET_INGREDIENTS_FAILED,
					});
				}
			})
			.catch((err) => {
				dispatch({
					type: GET_INGREDIENTS_FAILED,
				});
			});
	};
}

const ingredientsConstructor = (res) => {
	const data = new Object();
	Object.keys(ingredientsCategories).forEach((key) => {
		data[key] = [];
	});
	res.data.forEach((item) => {
		item.count = 0;
		data[item.type].push(item);
	});

	return data;
};
