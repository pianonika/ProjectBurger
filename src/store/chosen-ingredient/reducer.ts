import {
	REMOVE_CURR_INGREDIENT,
	SET_CURR_INGREDIENT,
	TChosenIngredientActions,
} from './action';
import { IngredientModel } from '@models/ingredient-model.model';

const chosenIngredientState: IChosenIngredientState = {
	ingredient: null,
};
export interface IChosenIngredientState {
	ingredient: IngredientModel | null;
}

export const chosenIngredientReducer = (
	state = chosenIngredientState,
	action: TChosenIngredientActions
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
