import { ingedientsMock } from '@utils/mocks/ingedients';
import { IngredientModel } from '@models/ingredient-model.model';
import {
	calcDecrementItems,
	calcIncrementItems,
	ingredientsReducer,
	initialState,
	TIngredients,
	TItemsByCategory,
} from '@store/ingredients/reducer';
import {
	DECREMENT_INGREDIENTS_COUNT,
	defaultListConstructor,
	GET_INGREDIENTS,
	GET_INGREDIENTS_FAILED,
	GET_INGREDIENTS_SUCCESS,
	INCREMENT_INGREDIENTS_COUNT,
	ingredientsConstructor,
	TIngredientsActions,
} from '@store/ingredients/action';

const ingredient: IngredientModel = ingedientsMock[0];
const ingredientsByCategory = ingredientsConstructor({
	data: ingedientsMock,
}) as TItemsByCategory;

describe('Ingredients reducer', () => {
	it('should return the initial state', () => {
		const action = {
			type: '',
			payload: ingredient,
		} as unknown as TIngredientsActions;
		const state = ingredientsReducer(undefined, action);
		expect(state).toEqual(initialState);
	});

	it('GET_INGREDIENTS', () => {
		const action = { type: GET_INGREDIENTS, payload: ingredient };
		const state = ingredientsReducer(initialState, action);

		expect(state).toEqual({
			...initialState,
			itemsRequest: true,
		});
	});

	it('GET_INGREDIENTS_SUCCESS', () => {
		const action = {
			type: GET_INGREDIENTS_SUCCESS,
			payload: {
				filtred: ingredientsConstructor({ data: ingedientsMock }),
				defaultList: defaultListConstructor(ingedientsMock),
			},
		};
		const state = ingredientsReducer(initialState, action);

		expect(state).toEqual({
			...initialState,
			items: action.payload.filtred,
			defaultList: action.payload.defaultList,
			itemsRequest: false,
			itemsFailed: false,
		});
	});

	it('GET_INGREDIENTS_FAILED', () => {
		const action = {
			type: GET_INGREDIENTS_FAILED,
		};
		const state = ingredientsReducer(initialState, action);

		expect(state).toEqual({
			...initialState,
			itemsRequest: false,
			itemsFailed: true,
		});
	});

	it('INCREMENT_INGREDIENTS_COUNT', () => {
		const action = {
			type: INCREMENT_INGREDIENTS_COUNT,
			payload: ingredient,
		};

		const newInitialState = {
			...initialState,
			items: ingredientsByCategory,
		} as TIngredients;
		const state = ingredientsReducer(newInitialState, action);
		const items = calcIncrementItems(newInitialState.items, action);

		expect(state).toEqual({
			...initialState,
			items: items,
		});
	});

	it('DECREMENT_INGREDIENTS_COUNT', () => {
		const action = {
			type: DECREMENT_INGREDIENTS_COUNT,
			payload: ingredient,
		};

		const newInitialState = {
			...initialState,
			items: { ...ingredientsByCategory },
		} as TIngredients;
		const state = ingredientsReducer(newInitialState, action);
		const items = calcDecrementItems(newInitialState.items, action);

		expect(state).toEqual({
			...initialState,
			items: items,
		});
	});
});
