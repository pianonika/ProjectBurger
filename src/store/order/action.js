import { fetchWithRefresh } from '@utils/checkResponse';

export const SEND_ORDER = 'SEND_ORDER';
export const SEND_ORDER_FAILED = 'SEND_ORDER_FAILED';
export const SEND_ORDER_SUCCESS = 'SEND_ORDER_SUCCESS';
export const CLEAR_ORDER_INFO = 'CLEAR_ORDER_INFO';

export function sendOrder(productsIds) {
	return function (dispatch) {
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
			})
			.catch((err) => {
				dispatch({
					type: SEND_ORDER_FAILED,
				});
			});
	};
}
