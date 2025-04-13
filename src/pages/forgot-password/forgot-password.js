import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import s from './forgot-password.module.less';
import {
	Button,
	Input,
} from '@ya.praktikum/react-developer-burger-ui-components';
import { useAppDispatch } from '@models/hooks';
import { forgotRequest } from '@store/auth/action';
import { useSelector } from 'react-redux';
import { useForm } from '../../hooks/useForm';

export function ForgotPasswordPage() {
	const dispatch = useAppDispatch();
	const navigate = useNavigate();
	const isRequestInProgress = useSelector(
		(state) => state.authorization.requestInProgress
	);
	const { values, handleChange } = useForm({ email: '' });
	const checkEmail = (e) => {
		e.preventDefault();
		localStorage.setItem('forgotPage', true);
		dispatch(forgotRequest(JSON.stringify({ email: values.email })));
		!isRequestInProgress && navigate('/reset-password');
	};

	return (
		<div className='page_wrapper'>
			<h1 className='text text_type_main-medium page_header'>
				Восстановление пароля
			</h1>
			<div className='page_content'>
				<div className='page_content__left'></div>
				<div className='page_content__center'>
					<form className={s.form} onSubmit={checkEmail}>
						<div className={s.form_field}>
							<Input
								placeholder='Укажите e-mail'
								value={values.email}
								name='email'
								onChange={handleChange}
							/>
						</div>
						<div className={s.form_field}>
							<Button htmlType={'submit'} primary={true}>
								Восстановить
							</Button>
						</div>
					</form>
					<p className={s.form_comment}>
						Вспомнили пароль? <Link to='/login'>Войти</Link>
					</p>
				</div>
				<div className='page_content__right'></div>
			</div>
		</div>
	);
}
