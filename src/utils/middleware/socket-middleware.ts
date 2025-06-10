import { AppActions, AppDispatch, RootState } from '../../index';
import { Middleware, MiddlewareAPI } from 'redux';
import { IMessage, IMessageResponse } from '@models/modelsData';
import { TWSOrdersListActions } from '@store/ordersList/actions';
import { TWSOrdersListForUserActions } from '@store/ordersListForUser/actions';
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
		const { dispatch } = store;

		return (next) => (action: AppActions) => {
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
				socket.onopen = (event) => {
					dispatch({ type: onOpen, payload: event });
				};

				socket.onerror = (event) => {
					dispatch({ type: onError, payload: event });
				};

				socket.onclose = (event) => {
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

					try {
						const { success, ...restParsedData } = parsedData;
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
									dispatch({ type: onError });
									dispatch({ type: onError, payload: error });
								});

							dispatch({ type: disconnect });

							return;
						}
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
