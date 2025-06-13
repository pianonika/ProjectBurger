import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './styles.css';
import { App } from '@components/app/app';
import { Provider } from 'react-redux';
import { configureStore } from '@store/root/store';
import { HashRouter} from 'react-router-dom';
import type { AppActions } from '@store/root/action';
import type { ThunkAction, ThunkDispatch } from 'redux-thunk';

const store = configureStore();
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = ThunkDispatch<RootState, unknown, AppActions>;
export type AppThunkAction<ReturnType = void> = ThunkAction<
	ReturnType,
	RootState,
	unknown,
	AppActions
>;

const domNode = document.getElementById('root') as HTMLDivElement;
const root = createRoot(domNode);

root.render(
	<StrictMode>
		<HashRouter>
			<Provider store={store}>
				<App />
			</Provider>
		</HashRouter>
	</StrictMode>
);
