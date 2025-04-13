import { SET_CURR_INGREDIENT, REMOVE_CURR_INGREDIENT } from './action';

const chosenIngredientState = {
	ingredient: null,
};

export const chosenIngredientReducer = (
	state = chosenIngredientState,
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
