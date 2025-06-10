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
	onSendMessage,
} from '@store/ordersLIst/actions';
import { createStore } from '@reduxjs/toolkit';
import { WS_URL } from '@store/vars';

// const composeEnhancers =
// 	typeof window === 'object' && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
// 		? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({})
// 		: compose;
const composeEnhancers =
	(process.env.NODE_ENV === 'development'
		? (window as any)?.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
		: null) || compose;

export type TWsActions = {
	wsOnConnect: typeof connect;
	onOpen?: typeof onOpen;
	onClose?: typeof onClose;
	onError: typeof onError;
	wsSendMessage: typeof onSendMessage;
	onMessage: typeof onMessage;
};
const wsActions: TWsActions = {
	wsOnConnect: connect,
	wsSendMessage: onSendMessage,
	onOpen: onOpen,
	onClose: onClose,
	onError: onError,
	onMessage: onMessage,
};

const enhancer = composeEnhancers(
	applyMiddleware(thunk, socketMiddleware(`${WS_URL}/orders/all`, wsActions))
);

export const configureStore = () => {
	return createStore(rootReducer, enhancer);
};
