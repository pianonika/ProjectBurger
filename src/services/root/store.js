import { rootReducer } from './reducer.js';
import { compose, createStore, applyMiddleware } from 'redux';
import { thunk } from 'redux-thunk';

const composeEnhancers =
	typeof window === 'object' && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
		? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({})
		: compose;

const enhancer = composeEnhancers(applyMiddleware(thunk));

export const configureStore = () => {
	return createStore(rootReducer, enhancer);
};
