import { connect, LiveTableActionTypes, onMessage } from './actions';
import { WebsocketStatus } from '@models/live-table';
import { RootState } from '../../index';
import { OrderCard } from '@models/order';

export type LiveTableState = {
	orders: OrderCard[];
	status: WebsocketStatus;
	total: string | null;
	totalToday: string | null;
};

export const initialState: LiveTableState = {
	status: WebsocketStatus.OFFLINE,
	orders: [],
	total: null,
	totalToday: null,
};

export const liveTableReducer = (
	state = initialState,
	action: LiveTableActionTypes
): LiveTableState => {
	switch (action.type) {
		case connect: {
			return {
				...state,
				status: WebsocketStatus.CONNECTING,
			};
		}
		case onMessage: {
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

export const getOrders = (state: RootState) => state.liveTable.orders;
export const getLiveTableState = (state: RootState) => state.liveTable;
