import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { ProvideAuth } from '../../services/auth';
import AppHeaderEl from '../app-header/app-header';
import s from './app.module.less';
import { HomePage } from '../home/home';
import NotFound404 from '../not-found-404/not-found-404';
import { LoginPage } from '../../pages/login/login';
import { RegisterPage } from '../../pages/register/register';
import { ForgotPasswordPage } from '../../pages/forgot-password/forgot-password';

export const App = () => {
	return (
		<div className={s.page}>
			<div className='header'>
				<AppHeaderEl />
			</div>
			<main className={s.main}>
				<ProvideAuth>
					<BrowserRouter>
						<Routes>
							<Route path='/' element={<HomePage />} />
							<Route path='/login' element={<LoginPage />} />
							<Route path='/register' element={<RegisterPage />} />
							<Route path='/forgot-password' element={<ForgotPasswordPage />} />
							{/*<Route path="/list" element={<ListPage />} />*/}
							{/*<Route path="/list/:country" element={<CountryPage />} />*/}
							{/*<Route path="/list/:country/:personId" element={<PersonPage />} />*/}
							<Route path='*' element={<NotFound404 />} />
						</Routes>
					</BrowserRouter>
				</ProvideAuth>
			</main>
		</div>
	);
};
