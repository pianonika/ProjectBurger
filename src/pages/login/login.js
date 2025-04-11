import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import s from './login.module.less';
import {
	Button,
	Input,
	PasswordInput,
} from '@ya.praktikum/react-developer-burger-ui-components';
import { useAppDispatch } from '@models/hooks';
import { loginRequest } from '@store/auth/action';

export function LoginPage() {
	const [form, setValue] = useState({ email: '', password: '' });
	const dispatch = useAppDispatch();

	const onChange = (e) => {
		setValue({ ...form, [e.target.name]: e.target.value });
	};
	const login = (e) => {
		e.preventDefault();
		dispatch(loginRequest(form));
	};

	return (
		<div className='page_wrapper'>
			<h1 className='text text_type_main-medium page_header'>Вход</h1>
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
							<Button onClick={login} primary={true}>
								Войти
							</Button>
						</div>
					</form>
					<p className={s.form_comment}>
						Вы — новый пользователь?{' '}
						<Link to='/register'> Зарегистрироваться</Link>
					</p>
					<p className={s.form_comment}>
						Забыли пароль?{' '}
						<Link to='/forgot-password'>Восстановить пароль</Link>
					</p>
				</div>
				<div className='page_content__right'></div>
			</div>
		</div>
	);
}
