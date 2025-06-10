import { AppActions, AppDispatch, RootState } from '../../index';
import { Middleware, MiddlewareAPI } from 'redux';
import { IMessage, IMessageResponse } from '@models/modelsData';
import { TWSOrdersListActions } from '@store/ordersList/actions';
import { TWSOrdersListForUserActions } from '@store/ordersListForUser/actions';

export const RECONNECT_PERIOD = 3000;

export type TWsActions = TWSOrdersListActions | TWSOrdersListForUserActions;
export const socketMiddleware = (
	wsUrl: string,
	wsActions: TWsActions
): Middleware => {
	return ((store: MiddlewareAPI<AppDispatch, RootState>) => {
		let socket: WebSocket | null = null;
		const { dispatch } = store;

		return (next) => (action: AppActions) => {
			const { type } = action;
			const { connect, onOpen, onClose, onError, onMessage } = wsActions;
			// const user = useAppSelector(getUser);
			const accessToken = localStorage.getItem('accessToken');
			if (type === connect && accessToken) {
				socket = new WebSocket(
					`${wsUrl}?token=${accessToken.replace('Bearer ', '')}`
				);
			}
			if (socket) {
				socket.onopen = (event) => {
					dispatch({ type: onOpen, payload: event });
				};

				socket.onerror = (event) => {
					dispatch({ type: onError, payload: event });
				};

				socket.onmessage = (event) => {
					const { data } = event;
					const parsedData: IMessageResponse = JSON.parse(data);

					try {
						const { success, ...restParsedData } = parsedData;
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

				socket.onclose = (event) => {
					dispatch({ type: onClose, payload: event });
				};

				if (type === onMessage) {
					const payload = action.payload;
					const message = {
						...(payload as unknown as IMessage),
						token: accessToken,
					};
					socket.send(JSON.stringify(message));
				}
			}

			next(action);
		};
	}) as Middleware;
};
