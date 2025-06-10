import {
	TUserListActionTypes,
	userListConnect,
	userListOnMessage,
} from './actions';
import { WebsocketStatus } from '@models/live-table';
import { RootState } from '../../index';
import { OrderCard } from '@models/order';

export type TOrdersListForUserState = {
	orders: OrderCard[];
	status: WebsocketStatus;
	total: string | null;
	totalToday: string | null;
};

export const initialState: TOrdersListForUserState = {
	status: WebsocketStatus.OFFLINE,
	orders: [],
	total: null,
	totalToday: null,
};

export const ordersListForUserReducer = (
	state = initialState,
	action: TUserListActionTypes
): TOrdersListForUserState => {
	switch (action.type) {
		case userListConnect: {
			return {
				...state,
				status: WebsocketStatus.CONNECTING,
			};
		}
		case userListOnMessage: {
			return {
				...state,
				orders: action.payload.orders,
				total: action.payload.total,
				totalToday: action.payload.totalToday,
			};
		}
		default: {
			return state;
		}
	}
};

export const getUserOrders = (state: RootState) =>
	state.ordersListForUser.orders;
export const getUserOrdersState = (state: RootState) => state.ordersListForUser;
