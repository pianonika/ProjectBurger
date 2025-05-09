import { SEND_ORDER, SEND_ORDER_FAILED, SEND_ORDER_SUCCESS, CLEAR_ORDER_INFO } from './action.js';

const initialState = {
	currentOrder: {
		name: '',
		order: { number: null },
		success: null,
	},
	requestInProgress: false,
	sendOrderFailed: false,
};
// {
// 	name: 'Space флюоресцентный бургер',
// 	order: { number: 2604 },
// 	success: true,
// },

export const orderReducer = (state = initialState, action) => {
	switch (action.type) {
		case SEND_ORDER: {
			return {
				...state,
				requestInProgress: true,
			};
		}
		case SEND_ORDER_SUCCESS: {
			return {
				...state,
				currentOrder: action.payload,
				requestInProgress: false,
				sendOrderFailed: false,
			};
		}
		case SEND_ORDER_FAILED: {
			return { ...state, requestInProgress: false, sendOrderFailed: true };
		}
		case CLEAR_ORDER_INFO: {
			return {
				...state,
				currentOrder: {
					...initialState.currentOrder,
					order: { ...initialState.currentOrder.order },
				},
			};
		}
		default: {
			return state;
		}
	}
};
