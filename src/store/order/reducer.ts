import {
	CLEAR_ORDER_INFO,
	SEND_ORDER,
	SEND_ORDER_FAILED,
	SEND_ORDER_SUCCESS,
	TSendOrderActions,
} from './action';

const initialState: orderState = {
	currentOrder: {
		name: '',
		order: { number: null },
		success: null,
	},
	requestInProgress: false,
	sendOrderFailed: false,
};

export interface orderState {
	currentOrder: ICurrentOrder;
	requestInProgress: boolean | null;
	sendOrderFailed: boolean;
}
export interface ICurrentOrder {
	name: string;
	order: { number: string | null };
	success: boolean | null;
}

export const orderReducer = (
	state = initialState,
	action: TSendOrderActions
) => {
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
				requestInProgress: false,
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
