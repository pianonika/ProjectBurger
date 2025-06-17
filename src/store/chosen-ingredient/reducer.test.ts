import {
	REMOVE_CURR_INGREDIENT,
	SET_CURR_INGREDIENT,
	TChosenIngredientActions,
} from '@store/chosen-ingredient/action';
import {
	chosenIngredientReducer,
	chosenIngredientState,
} from '@store/chosen-ingredient/reducer';
import { ingedientsMock } from '@utils/mocks/ingedients';
import { IngredientModel } from '@models/ingredient-model.model';

const ingredient: IngredientModel = ingedientsMock[0];

describe('Chosen ingredient reducer', () => {
	it('should return the initial state', () => {
		const action = {
			type: '',
			payload: ingredient,
		} as unknown as TChosenIngredientActions;
		const state = chosenIngredientReducer(undefined, action);
		expect(state).toEqual(chosenIngredientState);
	});

	it('SET_CURR_INGREDIENT', () => {
		const action = { type: SET_CURR_INGREDIENT, payload: ingredient };
		const state = chosenIngredientReducer(chosenIngredientState, action);

		expect(state).toEqual({
			...chosenIngredientState,
			ingredient: action.payload,
		});
	});

	it('REMOVE_CURR_INGREDIENT', () => {
		const action = { type: REMOVE_CURR_INGREDIENT };
		const state = chosenIngredientReducer(chosenIngredientState, action);

		expect(state).toEqual({
			ingredient: null,
		});
	});
});
