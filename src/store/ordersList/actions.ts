//from components to middleware

import { OrderCard } from '@models/order';

export const connect = 'connect' as const;
export interface IConnectAction {
	readonly type: typeof connect;
}

export const disconnect = 'disconnect' as const;
export interface IDisconnectAction {
	readonly type: typeof disconnect;
}

export const onConnecting = 'onConnecting' as const;
export interface IOnConnectingAction {
	readonly type: typeof onConnecting;
}

export const WS_ON_OPEN = 'WS_ON_OPEN' as const;
export interface IOnOpenAction {
	readonly type: typeof WS_ON_OPEN;
}

export const onError = 'onError' as const;
export interface IOnErrorAction {
	readonly type: typeof onError;
	readonly payload: string;
}

export const onClose = 'onClose' as const;
export interface IOnCloseAction {
	readonly type: typeof onClose;
}

export const onMessage = 'onMessage' as const;
export interface IOnMessageAction {
	readonly type: typeof onMessage;
	readonly payload: {
		orders: OrderCard[];
		total: string;
		totalToday: string;
	};
}

export type TWSOrdersListActions = {
	connect: typeof connect;
	disconnect: typeof disconnect;
	onOpen: typeof WS_ON_OPEN;
	onClose: typeof onClose;
	onError: typeof onError;
	onMessage: typeof onMessage;
};

export type LiveTableActionTypes =
	| IConnectAction
	| IDisconnectAction
	| IOnConnectingAction
	| IOnOpenAction
	| IOnErrorAction
	| IOnCloseAction
	| IOnMessageAction;
