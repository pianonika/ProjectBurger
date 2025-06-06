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
import { OrderFeedPage } from '@pages/orders-feed/orders-feed';
import { OrderHistoryPage } from '@pages/orders-history/orders-history';
import { useAppDispatch } from '@models/hooks';
import { checkUserAuth } from '@store/auth/action';
import { OrderPage } from '@pages/order/order';
import { getIngredients } from '@store/ingredients/action';
import { NavigateFunction } from 'react-router/dist/development';

export const App = () => {
	const location = useLocation();
	const navigate: NavigateFunction = useNavigate();
	const modalLocation: Location = location.state?.modalLocation;
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
						path='/profile/feed'
						element={<OnlyAuth component={<OrderFeedPage />} />}
					/>
					<Route
						path='/profile/orders'
						element={<OnlyAuth component={<OrderHistoryPage />} />}
					/>
					<Route
						path='/profile/orders/:id'
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

				{modalLocation && (
					<Routes>
						<Route
							path='/profile/orders/:id'
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
