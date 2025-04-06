import React from 'react';
import { Route, Routes, useLocation, useNavigate } from 'react-router-dom';
import AppHeaderEl from '../app-header/app-header';
import s from './app.module.less';
import { HomePage } from '../home/home';
import NotFound404 from '../not-found-404/not-found-404';
import { LoginPage } from '@pages/login/login';
import { RegisterPage } from '@pages/register/register';
import { ForgotPasswordPage } from '@pages/forgot-password/forgot-password';
import { ResetPasswordPage } from '@pages/reset-password/reset-password';
import IngredientDetails from '../ingredient-details/ingredient-details';
import Modal from '@components/modal/modal';
import { IngredientDetailsPage } from '@pages/ingredient-details-page/ingredient-details-page';

export const App = () => {
	const location = useLocation();
	const navigate = useNavigate();
	const modalLocation = location.state?.modalLocation;
	const handleModalClose = () => {
		navigate(-1);
	};

	return (
		<div className={s.page}>
			<div className='header'>
				<AppHeaderEl />
			</div>
			<main className={s.main}>
				<Routes location={modalLocation || location}>
					<Route path='/' element={<HomePage />} />
					<Route path='/login' element={<LoginPage />} />
					<Route path='/register' element={<RegisterPage />} />
					<Route path='/forgot-password' element={<ForgotPasswordPage />} />
					<Route path='/reset-password' element={<ResetPasswordPage />} />
					<Route path='/profile' element={<ResetPasswordPage />} />
					<Route path='/ingredients/:id' element={<IngredientDetailsPage />} />
					<Route path='*' element={<NotFound404 />} />
				</Routes>

				{modalLocation && (
					<Routes>
						<Route
							path='/ingredients/:id'
							element={
								<Modal
									isActive={true}
									closeModal={handleModalClose}
									title={'Детали ингредиента'}>
									<IngredientDetails />
								</Modal>
							}
						/>
					</Routes>
				)}
			</main>
		</div>
	);
};
