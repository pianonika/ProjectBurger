import type { Middleware, MiddlewareAPI } from '@reduxjs/toolkit';

import type { AppActions } from '@store/root/action';
import type { IMessageResponse } from '@models/modelsData';
import type { AppDispatch, RootState } from '../../index';
import { refreshToken } from '@utils/checkResponse';
import { TWSOrdersListForUserActions } from '@store/ordersListForUser/actions';
import { TWSOrdersListActions } from '@store/ordersList/actions';

export const RECONNECT_PERIOD = 3000;
export const socketMiddleware = (
	wsUrl: string,
	wsActions: TWSOrdersListActions | TWSOrdersListForUserActions,
	withTokenRefresh = false
): Middleware => {
	return ((store: MiddlewareAPI<AppDispatch, RootState>) => {
		let socket: WebSocket | null = null;
		let isConnected = false;
		let reconnectTimer = 0;

		return (next) => (action: AppActions) => {
			const { dispatch } = store;
			const { type } = action;
			const { connect, disconnect, onOpen, onClose, onError, onMessage } =
				wsActions;
			const accessToken = localStorage.getItem('accessToken');
			if (type === connect && accessToken) {
				socket = new WebSocket(
					`${wsUrl}?token=${accessToken.replace('Bearer ', '')}`
				);
				isConnected = true;
			}
			if (socket) {
				socket.onopen = () => {
					dispatch({ type: onOpen });
				};

				socket.onerror = () => {
					dispatch({ type: onError, payload: 'Error' });
				};

				socket.onclose = () => {
					dispatch({ type: onClose });

					if (isConnected) {
						reconnectTimer = window.setTimeout(() => {
							dispatch({ type: connect });
						}, RECONNECT_PERIOD);
					}
				};

				socket.onmessage = (event) => {
					const { data } = event;
					const parsedData: IMessageResponse = JSON.parse(data);
					try {
						if (
							withTokenRefresh &&
							parsedData.message === 'Invalid or missing token'
						) {
							refreshToken()
								.then((refreshedData) => {
									const wssUrl = new URL(wsUrl);
									wssUrl.searchParams.set(
										'token',
										refreshedData.accessToken.replace('Bearer ', '')
									);
									dispatch({ type: connect });
								})
								.catch((error) => {
									dispatch({ type: onError, payload: error });
								});

							dispatch({ type: disconnect });

							return;
						}
						dispatch({
							type: onMessage,
							payload: parsedData,
						});
					} catch (error) {
						dispatch({
							type: onError,
							payload: (error as Error).message,
						});
					}
				};

				if (socket && type === disconnect) {
					clearTimeout(reconnectTimer);
					isConnected = false;
					reconnectTimer = 0;
					socket.close();
					socket = null;

					return;
				}
			}

			next(action);
		};
	}) as Middleware;
};
