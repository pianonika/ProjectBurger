import type { Middleware, MiddlewareAPI } from '@reduxjs/toolkit';

import type { AppActions } from '@store/root/action';
import type { IMessage, IMessageResponse } from '@models/modelsData';
import type { TWSOrdersListActions } from '@store/ordersList/actions';
import type { TWSOrdersListForUserActions } from '@store/ordersListForUser/actions';
import type { AppDispatch, RootState } from '../../index';
import { refreshToken } from '@utils/checkResponse';

export const RECONNECT_PERIOD = 3000;

export type TWsActions = TWSOrdersListActions | TWSOrdersListForUserActions;
export const socketMiddleware = (
	wsUrl: string,
	wsActions: TWsActions,
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
				// socket.onopen = (event) => {
				// 	dispatch({ type: onOpen, payload: event });
				// };
				socket.onopen = event => {
					// @ts-ignore
					dispatch({ type: onOpen, payload: event });
				};

				socket.onerror = (event) => {
					// @ts-ignore
					dispatch({ type: onError, payload: event });
				};

				socket.onclose = (event) => {
					// @ts-ignore
					dispatch({ type: onClose, payload: event });

					if (isConnected) {
						reconnectTimer = window.setTimeout(() => {
							dispatch({ type: connect });
						}, RECONNECT_PERIOD);
					}
				};

				socket.onmessage = (event) => {
					const { data } = event;
					const parsedData: IMessageResponse = JSON.parse(data);
					const { success, ...restParsedData } = parsedData;

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

							// @ts-ignore
							dispatch({ type: disconnect });

							return;
						}
						// @ts-ignore
						dispatch({
							type: onMessage,
							payload: restParsedData,
						});
					} catch (error) {
						dispatch({
							type: onError,
							payload: (error as Error).message,
						});
					}
				};

				if (type === onMessage) {
					const payload = action.payload;
					const message = {
						...(payload as unknown as IMessage),
						token: accessToken,
					};
					socket.send(JSON.stringify(message));
				}

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
