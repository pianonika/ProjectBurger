import { rootReducer } from './reducer';
import { applyMiddleware, compose } from 'redux';
import { thunk } from 'redux-thunk';
import { socketMiddleware } from '@utils/middleware/socket-middleware';
import {
	connect,
	onClose,
	onError,
	onMessage,
	onOpen,
	disconnect,
	TWSOrdersListActions,
} from '@store/ordersList/actions';
import { createStore } from '@reduxjs/toolkit';
import { WS_URL } from '@store/vars';
import {
	TWSOrdersListForUserActions,
	userListConnect,
	userListOnClose,
	userListOnError,
	userListOnMessage,
	userListOnOpen,
	userListDisconnect,
} from '@store/ordersListForUser/actions';

// const composeEnhancers =
// 	typeof window === 'object' && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
// 		? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({})
// 		: compose;
const composeEnhancers =
	(process.env.NODE_ENV === 'development'
		? (window as any)?.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
		: null) || compose;

const wsOrdersListActions: TWSOrdersListActions = {
	connect,
	disconnect,
	onOpen,
	onClose,
	onError,
	onMessage,
};
const wsOrdersListForUserActions: TWSOrdersListForUserActions = {
	connect: userListConnect,
	disconnect: userListDisconnect,
	onOpen: userListOnOpen,
	onClose: userListOnClose,
	onError: userListOnError,
	onMessage: userListOnMessage,
};

const enhancer = composeEnhancers(
	applyMiddleware(
		thunk,
		socketMiddleware(`${WS_URL}/orders/all`, wsOrdersListActions, true),
		socketMiddleware(`${WS_URL}/orders`, wsOrdersListForUserActions, true)
	)
);

export const configureStore = () => {
	return createStore(rootReducer, enhancer);
};
