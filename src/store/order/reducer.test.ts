import { initialState, orderReducer } from '@store/order/reducer';
import { ingedientsMock } from '@utils/mocks/ingedients';
import { IngredientModel } from '@models/ingredient-model.model';
import {
	CLEAR_ORDER_INFO,
	SEND_ORDER_FAILED,
	SEND_ORDER,
	TSendOrderActions,
	GET_ORDER_CURR_CARD_SUCCESS,
	DELETE_ORDER_CURR_CARD,
} from '@store/order/action';

const ingredient: IngredientModel = ingedientsMock[0];

describe('Order reducer', () => {
	it('should return the initial state', () => {
		const action = {
			type: '',
			payload: ingredient,
		} as unknown as TSendOrderActions;
		const state = orderReducer(undefined, action);
		expect(state).toEqual(initialState);
	});

	it('ADD_FILLINGS_ITEM', () => {
		const action = { type: SEND_ORDER };
		const state = orderReducer(initialState, action);

		expect(state).toEqual({
			...initialState,
			requestInProgress: true,
		});
	});

	it('SEND_ORDER_FAILED', () => {
		const action = { type: SEND_ORDER_FAILED };
		const state = orderReducer(initialState, action);

		expect(state).toEqual({
			...initialState,
			requestInProgress: false,
			sendOrderFailed: true,
		});
	});

	it('CLEAR_ORDER_INFO', () => {
		const action = { type: CLEAR_ORDER_INFO };
		const state = orderReducer(initialState, action);

		expect(state).toEqual({
			...initialState,
			requestInProgress: false,
			currentOrder: {
				...initialState.currentOrder,
				order: { ...initialState.currentOrder.order },
			},
		});
	});

	it('GET_ORDER_CURR_CARD_SUCCESS', () => {
		const action = { type: GET_ORDER_CURR_CARD_SUCCESS, payload: ingredient };
		const state = orderReducer(initialState, action);

		expect(state).toEqual({
			...initialState,
			currOrderCard: action.payload,
		});
	});

	it('DELETE_ORDER_CURR_CARD', () => {
		const action = { type: DELETE_ORDER_CURR_CARD };
		const state = orderReducer(initialState, action);

		expect(state).toEqual({
			...initialState,
			currOrderCard: null,
		});
	});
});
