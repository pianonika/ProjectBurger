import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import s from './reset-password.module.less';
import {
	Button,
	Input,
	PasswordInput,
} from '@ya.praktikum/react-developer-burger-ui-components';
import { resetPassword } from '@store/auth/action';
import { useAppDispatch } from '@models/hooks';
import {useSelector} from "react-redux";

export function ResetPasswordPage() {
	const [form, setValue] = useState({ email: '', password: '' });
	const dispatch = useAppDispatch();
	const navigate = useNavigate();
	const isFromForgotPage = !!localStorage.getItem('forgotPage');
	const isRequestInProgress = useSelector((state) => state.authorization.requestInProgress);


	useEffect(() => {
		!isFromForgotPage && navigate(-1);
	}, []);
	useEffect(() => {
		!isFromForgotPage && !isRequestInProgress && navigate('/login');
	}, [isRequestInProgress]);

	const onChange = (e) => {
		setValue({ ...form, [e.target.name]: e.target.value });
	};

	const save = (e) => {
		e.preventDefault();
		dispatch(
			resetPassword(
				JSON.stringify({ password: form.password, token: form.token })
			)
		);
	};

	return (
		isFromForgotPage && (
			<div className='page_wrapper'>
				<h1 className='text text_type_main-medium page_header'>
					Восстановление пароля
				</h1>
				<div className='page_content'>
					<div className='page_content__left'></div>
					<div className='page_content__center'>
						<form className={s.form}>
							<div className={s.form_field}>
								<PasswordInput
									placeholder='Введите новый пароль'
									value={form.password}
									name='password'
									onChange={onChange}
								/>
							</div>
							<div className={s.form_field}>
								<Input
									placeholder='Введите код из письма'
									value={form.token}
									name='token'
									onChange={onChange}
								/>
							</div>
							<div className={s.form_field}>
								<Button onClick={save} primary={true}>
									Сохранить
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
		)
	);
}
