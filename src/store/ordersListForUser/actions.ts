import { OrderCard } from '@models/order';

export const userListConnect = 'UserListConnect' as const;
export interface IUserListConnectAction {
	readonly type: typeof userListConnect;
	readonly payload: string;
}
export const userListDisconnect = 'UserListDisconnect' as const;
export interface IUserListDisconnectAction {
	readonly type: typeof userListDisconnect;
	readonly payload: string;
}

export const userListOnConnecting = 'UserListOnConnecting' as const;
export interface IUserListOnConnectingAction {
	readonly type: typeof userListOnConnecting;
}

export const userListOnOpen = 'UserListOnOpen' as const;
export interface IUserListOnOpenAction {
	readonly type: typeof userListOnOpen;
}

export const userListOnError = 'UserListOnError' as const;
export interface IUserListOnErrorAction {
	readonly type: typeof userListOnError;
	readonly payload: string;
}

export const userListOnClose = 'UserListOnClose' as const;
export interface IUserListOnCloseAction {
	readonly type: typeof userListOnClose;
}

export const userListOnMessage = 'UserListOnMessage' as const;
export interface IUserListOnMessageAction {
	readonly type: typeof userListOnMessage;
	readonly payload: {
		orders: OrderCard[];
		total: string;
		totalToday: string;
	};
}

export type TUserListActionTypes =
	| IUserListConnectAction
	| IUserListDisconnectAction
	| IUserListOnConnectingAction
	| IUserListOnOpenAction
	| IUserListOnErrorAction
	| IUserListOnCloseAction
	| IUserListOnMessageAction;

export type TWSOrdersListForUserActions = {
	connect: typeof userListConnect;
	onOpen: typeof userListOnOpen;
	onClose: typeof userListOnClose;
	onError: typeof userListOnError;
	onMessage: typeof userListOnMessage;
	disconnect: typeof userListDisconnect;
};
