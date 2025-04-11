import React, {useEffect, useState} from 'react';
import { Link, useNavigate } from 'react-router-dom';
import s from './forgot-password.module.less';
import {
	Button,
	Input,
} from '@ya.praktikum/react-developer-burger-ui-components';
import { useAppDispatch } from '@models/hooks';
import { forgotRequest } from '@store/auth/action';
import {useSelector} from "react-redux";

export function ForgotPasswordPage() {
	const dispatch = useAppDispatch();
	const navigate = useNavigate();
	const [form, setValue] = useState({ email: '', password: '' });
	const isRequestInProgress = useSelector((state) => state.authorization.requestInProgress);

	const onChange = (e) => {
		setValue({ ...form, [e.target.name]: e.target.value });
	};
	const checkEmail = (e) => {
		e.preventDefault();
		dispatch(forgotRequest(JSON.stringify({ email: form.email })));
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
					<form className={s.form}>
						<div className={s.form_field}>
							<Input
								placeholder='Укажите e-mail'
								value={form.email}
								name='email'
								onChange={onChange}
							/>
						</div>
						<div className={s.form_field}>
							<Button onClick={checkEmail} primary={true}>
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
