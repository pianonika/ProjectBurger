//from components to middleware

import { WebsocketStatus } from '@models/live-table';
import {Order, OrderCard} from "@models/order";

export const connect = 'connect' as const;
export interface IConnectAction {
	readonly type: typeof connect;
	readonly payload: string;
}

export const disconnect = 'disconnect' as const;
export interface IDisconnectAction {
	readonly type: typeof disconnect;
	readonly payload: string;
}

export const onConnecting = 'onConnecting' as const;
export interface IOnConnectingAction {
	readonly type: typeof onConnecting;
}

export const onOpen = 'onOpen' as const;
export interface IOnOpenAction {
	readonly type: typeof onOpen;
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

export const onSendMessage = 'onSendMessage' as const;
export interface IOnSendMessageAction {
	readonly type: typeof onSendMessage;
	readonly payload: string;
}

export type TWSOrdersListActions = {
	connect: typeof connect;
	onOpen: typeof onOpen;
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
