import { fetchWithRefresh, request } from '@utils/checkResponse';
import { CLEAR_CART } from '@store/cart/action';
import { ICurrentOrder } from '@store/order/reducer';
import { OrderCard } from '@models/order';

export const SEND_ORDER = 'SEND_ORDER' as const;
export const SEND_ORDER_FAILED = 'SEND_ORDER_FAILED' as const;
export const SEND_ORDER_SUCCESS = 'SEND_ORDER_SUCCESS' as const;
export const CLEAR_ORDER_INFO = 'CLEAR_ORDER_INFO' as const;
export const SET_ORDER_CURR_CARD = 'SET_ORDER_CURR_CARD' as const;
export const DELETE_ORDER_CURR_CARD = ' DELETE_ORDER_CURR_CARD' as const;
export const GET_ORDER_CURR_CARD = 'GET_ORDER_CURR_CARD' as const;
export const GET_ORDER_CURR_CARD_SUCCESS =
	'GET_ORDER_CURR_CARD_SUCCESS' as const;
export const GET_ORDER_CURR_CARD_FAILED = 'GET_ORDER_CURR_CARD_FAILED' as const;

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
export interface ISetOrderCardAction {
	readonly type: typeof SET_ORDER_CURR_CARD;
	readonly payload: OrderCard | null;
}
export interface IDeleteOrderCardAction {
	readonly type: typeof DELETE_ORDER_CURR_CARD;
}
export interface IGetOrderCardAction {
	readonly type: typeof GET_ORDER_CURR_CARD;
	readonly payload: number | null;
}
export interface IGetOrderCardSuccessAction {
	readonly type: typeof GET_ORDER_CURR_CARD_SUCCESS;
	readonly payload: any;
}
export interface IGetOrderCardFailedAction {
	readonly type: typeof GET_ORDER_CURR_CARD_FAILED;
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

export function getOrderInfo(id: string) {
	return function (dispatch) {
		dispatch({
			type: GET_ORDER_CURR_CARD,
		});

		request(`/api/orders/${id}`)
			.then((res) => {
				dispatch({
					type: GET_ORDER_CURR_CARD_SUCCESS,
					payload: res.orders[0],
				});
			})
			.catch((err) => {
				console.log('GET_ORDER_CURR_CARD_FAILED', err);
				dispatch({
					type: GET_ORDER_CURR_CARD_FAILED,
				});
			});
	};
}

export type TSendOrderActions =
	| ISendOrderAction
	| ISendOrderFailedAction
	| ISendOrderSuccessAction
	| IClearOrderInfoAction
	| ISetOrderCardAction
	| IDeleteOrderCardAction
	| IGetOrderCardAction
	| IGetOrderCardSuccessAction
	| IGetOrderCardFailedAction;
