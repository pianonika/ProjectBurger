import { fetchWithRefresh } from '@utils/checkResponse';
import { CLEAR_CART } from '@store/cart/action';
import { ICurrentOrder } from '@store/order/reducer';

export const SEND_ORDER = 'SEND_ORDER' as const;
export const SEND_ORDER_FAILED = 'SEND_ORDER_FAILED' as const;
export const SEND_ORDER_SUCCESS = 'SEND_ORDER_SUCCESS' as const;
export const CLEAR_ORDER_INFO = 'CLEAR_ORDER_INFO' as const;

export interface ISendOrderAction {
	readonly type: typeof SEND_ORDER;
}

export interface ISendOrderFailedAction {
	readonly type: typeof SEND_ORDER_FAILED;
}

export interface ISendOrderSuccessAction {
	readonly type: typeof SEND_ORDER_SUCCESS;
	readonly payload: ICurrentOrder;
}

export interface IClearOrderInfoAction {
	readonly type: typeof CLEAR_ORDER_INFO;
}

export function sendOrder(productsIds: string) {
	return function (
		dispatch: (arg0: { type: string; payload?: Response }) => void
	) {
		dispatch({
			type: SEND_ORDER,
		});

		fetchWithRefresh('/api/orders', {
			method: 'POST',
			body: productsIds,
			headers: {
				'Content-Type': 'application/json;charset=utf-8',
			},
		})
			.then((res) => {
				dispatch({
					type: SEND_ORDER_SUCCESS,
					payload: res,
				});
				dispatch({
					type: CLEAR_CART,
				});
			})
			.catch(() => {
				dispatch({
					type: SEND_ORDER_FAILED,
				});
			});
	};
}

export type TSendOrderActions =
	| ISendOrderAction
	| ISendOrderFailedAction
	| ISendOrderSuccessAction
	| IClearOrderInfoAction;
