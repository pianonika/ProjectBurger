import {
	initialState,
	ordersListForUserReducer,
} from '@store/ordersListForUser/slice';
import { ordersMock } from '@utils/mocks/orders';
import { LiveTableActionTypes } from '@store/ordersList/actions';
import { WebsocketStatus } from '@models/live-table';
import {
	TUserListActionTypes,
	userListConnect,
	userListOnMessage,
} from '@store/ordersListForUser/actions';
import { OrderCard } from '@models/order';

const order: OrderCard[] = ordersMock;

describe('OrdersListFor User reducer', () => {
	it('should return the initial state', () => {
		const action = {
			type: '',
			payload: order,
		} as unknown as TUserListActionTypes;
		const state = ordersListForUserReducer(undefined, action);
		expect(state).toEqual(initialState);
	});

	it('userListConnect', () => {
		const action = { type: userListConnect };
		const state = ordersListForUserReducer(initialState, action);

		expect(state).toEqual({
			...initialState,
			status: WebsocketStatus.CONNECTING,
		});
	});

	it('userListOnMessage', () => {
		const action = {
			type: userListOnMessage,
			payload: { orders: ordersMock, total: '10', totalToday: '5' },
		};
		const state = ordersListForUserReducer(initialState, action);

		expect(state).toEqual({
			...initialState,
			orders: action.payload.orders,
			total: action.payload.total,
			totalToday: action.payload.totalToday,
		});
	});
});
