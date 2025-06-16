import { initialState, liveTableReducer } from '@store/ordersList/slice';
import { OrderCard } from '@models/order';
import { ordersMock } from '@utils/mocks/orders';
import {
	connect,
	LiveTableActionTypes,
	onMessage,
} from '@store/ordersList/actions';
import { WebsocketStatus } from '@models/live-table';

const orders: OrderCard[] = ordersMock;

describe('OrdersList reducer', () => {
	it('should return the initial state', () => {
		const action = {
			type: '',
			payload: orders,
		} as unknown as LiveTableActionTypes;
		const state = liveTableReducer(undefined, action);
		expect(state).toEqual(initialState);
	});

	it('connect', () => {
		const action = { type: connect };
		const state = liveTableReducer(initialState, action);

		expect(state).toEqual({
			...initialState,
			status: WebsocketStatus.CONNECTING,
		});
	});

	it('onMessage', () => {
		const action = {
			type: onMessage,
			payload: { orders: orders, total: '10', totalToday: '5' },
		};
		const state = liveTableReducer(initialState, action);

		expect(state).toEqual({
			...initialState,
			orders: action.payload.orders,
			total: action.payload.total,
			totalToday: action.payload.totalToday,
		});
	});
});
