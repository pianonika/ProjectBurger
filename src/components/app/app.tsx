import React, { useEffect } from 'react';
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
import { ProfilePage } from '@pages/profile/profile';
import { OnlyAuth, OnlyUnAuth } from '@components/app/protected-route';
import { useAppDispatch } from '@models/hooks';
import { checkUserAuth } from '@store/auth/action';
import { OrderListPage } from '@pages/orders-list/orders-list';
import { OrderPage } from '@pages/order/order';
import { getIngredients } from '@store/ingredients/action';

export const App = () => {
	const location = useLocation();
	const navigate = useNavigate();
	const modalLocation = location.state?.modalLocation;
	const handleModalClose = () => {
		navigate(-1);
	};
	const dispatch = useAppDispatch();

	useEffect(() => {
		dispatch(checkUserAuth());
		dispatch(getIngredients());
	}, []);

	return (
		<div className={s.page}>
			<div className='header'>
				<AppHeaderEl />
			</div>
			<main className={s.main}>
				<Routes location={modalLocation || location}>
					<Route path='/' element={<HomePage />} />
					<Route
						path='/login'
						element={<OnlyUnAuth component={<LoginPage />} />}
					/>
					<Route
						path='/register'
						element={<OnlyUnAuth component={<RegisterPage />} />}
					/>
					<Route
						path='/forgot-password'
						element={<OnlyUnAuth component={<ForgotPasswordPage />} />}
					/>
					<Route
						path='/reset-password'
						element={<OnlyUnAuth component={<ResetPasswordPage />} />}
					/>
					<Route
						path='/profile'
						element={<OnlyAuth component={<ProfilePage />} />}
					/>
					<Route
						path='/profile/orders'
						element={<OnlyAuth component={<OrderListPage />} />}
					/>
					<Route
						path='/profile/orders/:number'
						element={<OnlyAuth component={<OrderPage />} />}
					/>
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
