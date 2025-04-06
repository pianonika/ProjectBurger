import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './styles.css';
import { App } from '@components/app/app';
import { Provider } from 'react-redux';
import { configureStore } from '@store/root/store';
import { ProvideAuth } from '@services/auth';
import { BrowserRouter } from 'react-router-dom';

const store = configureStore();

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

const domNode = document.getElementById('root') as HTMLDivElement;
const root = createRoot(domNode);

root.render(
	<StrictMode>
		<Provider store={store}>
			<ProvideAuth>
				<BrowserRouter>
					<App />
				</BrowserRouter>
			</ProvideAuth>
		</Provider>
	</StrictMode>
);
