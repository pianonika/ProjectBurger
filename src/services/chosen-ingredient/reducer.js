import { SET_CURR_INGREDIENT, REMOVE_CURR_INGREDIENT } from './action';

const currIngredientInitialState = {
	ingredient: null,
};

export const currIngredientReducer = (
	state = currIngredientInitialState,
	action
) => {
	switch (action.type) {
		case SET_CURR_INGREDIENT: {
			return {
				...state,
				ingredient: action.payload,
			};
		}
		case REMOVE_CURR_INGREDIENT: {
			return {
				ingredient: null,
			};
		}
		default: {
			return state;
		}
	}
};
