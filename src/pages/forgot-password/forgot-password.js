import React, { useCallback, useState } from 'react';
import { Link, Navigate } from 'react-router-dom';
import { useAuth } from '../../services/auth';
import s from './forgot-password.module.less';
import {
	Button,
	Input,
	PasswordInput,
} from '@ya.praktikum/react-developer-burger-ui-components';

export function ForgotPasswordPage() {
	let auth = useAuth();
	const [form, setValue] = useState({ email: '', password: '' });

	const onChange = (e) => {
		setValue({ ...form, [e.target.name]: e.target.value });
	};

	let restore = useCallback(
		(e) => {
			e.preventDefault();
			auth.restore(form);
		},
		[auth, form]
	);

	if (auth.user) {
		return <Navigate to={'/'} />;
	}

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
								placeholder='Email'
								value={form.email}
								name='email'
								onChange={onChange}
							/>
						</div>
						<div className={s.form_field}>
							<PasswordInput
								placeholder='Password'
								value={form.password}
								name='password'
								onChange={onChange}
							/>
						</div>
						<div className={s.form_field}>
							<Button onClick={restore} primary={true}>
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
