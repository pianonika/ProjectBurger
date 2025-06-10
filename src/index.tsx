import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './styles.css';
import { App } from '@components/app/app';
import { Provider } from 'react-redux';
import { configureStore } from '@store/root/store';
import { BrowserRouter } from 'react-router-dom';
import { LiveTableActionTypes } from '@store/ordersList/actions';
import { TSendOrderActions } from '@store/order/action';
import { TUserListActionTypes } from '@store/ordersListForUser/actions';

const store = configureStore();
export type AppActions =
	| LiveTableActionTypes
	| TSendOrderActions
	| TUserListActionTypes;
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

const domNode = document.getElementById('root') as HTMLDivElement;
const root = createRoot(domNode);

root.render(
	<StrictMode>
		<BrowserRouter>
			<Provider store={store}>
				<App />
			</Provider>
		</BrowserRouter>
	</StrictMode>
);
