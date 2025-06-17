import {
	ADD_FILLINGS_ITEM,
	CHANGE_ITEMS_ORDER,
	CLEAR_CART,
	REMOVE_FILLINGS_ITEM,
	SET_BUN,
	TCartActions,
} from '@store/cart/action';
import { cartReducer, initialState } from '@store/cart/reducer';
import { ingedientsMock } from '@utils/mocks/ingedients';
import {
	IngredientModel,
	IngredientModelUnic,
} from '@models/ingredient-model.model';

const ingredient: IngredientModel = ingedientsMock[0];

describe('Cart reducer', () => {
	it('should return the initial state', () => {
		const action = { type: '', payload: ingredient } as unknown as TCartActions;
		const state = cartReducer(undefined, action);
		expect(state).toEqual(initialState);
	});

	it('ADD_FILLINGS_ITEM', () => {
		const action = { type: ADD_FILLINGS_ITEM, payload: ingredient };
		const state = cartReducer(initialState, action);

		expect(state).toEqual({
			...initialState,
			fillings: [...initialState.fillings, action.payload],
		});
	});

	it('REMOVE_FILLINGS_ITEM', () => {
		const action = {
			type: REMOVE_FILLINGS_ITEM,
			payload: ingedientsMock[0]._id,
		};
		const state = cartReducer(initialState, action);

		expect(state).toEqual({
			...initialState,
			fillings: [
				...state?.fillings?.filter((i) => i.uniqueId !== action.payload),
			],
		});
	});

	it('CHANGE_ITEMS_ORDER', () => {
		const action = { type: CHANGE_ITEMS_ORDER, payload: ingedientsMock };
		const state = cartReducer(initialState, action);

		expect(state).toEqual({
			...initialState,
			fillings: action.payload,
		});
	});

	it('SET_BUN', () => {
		const action = {
			type: SET_BUN,
			payload: ingredient as IngredientModelUnic,
		};
		const state = cartReducer(initialState, action);

		expect(state).toEqual({
			...initialState,
			bun: action.payload,
		});
	});

	it('CLEAR_CART', () => {
		const action = { type: CLEAR_CART };
		const state = cartReducer(initialState, action);

		expect(state).toEqual({
			...initialState,
			bun: {},
			fillings: [],
		});
	});
});
