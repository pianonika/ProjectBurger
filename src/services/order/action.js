import { ingredientsCategories, BASE_URL } from '../../services/vars';

export const SEND_ORDER = 'SEND_ORDER';
export const SEND_ORDER_FAILED = 'SEND_ORDER_FAILED';
export const SEND_ORDER_SUCCESS = 'SEND_ORDER_SUCCESS';

export function sendOrder(productsIds) {
	return function (dispatch) {
		dispatch({
			type: SEND_ORDER,
		});

		fetch(`${BASE_URL}/api/orders`, {
			method: 'POST',
			body: productsIds,
			headers: {
				'Content-Type': 'application/json;charset=utf-8'
			},
		})
			.then((res) => res.json())
			.then((res) => {
				if (res && res.success) {
					dispatch({
						type: SEND_ORDER_SUCCESS,
						payload: res,
					});
				} else {
					dispatch({
						type: SEND_ORDER_FAILED,
					});
				}
			})
			.catch((err) => {
				dispatch({
					type: SEND_ORDER_FAILED,
				});
			});
	};
}
