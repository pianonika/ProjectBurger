import React, { useCallback, useState } from 'react';
import { Link, Navigate } from 'react-router-dom';
import { useAuth } from '../../services/auth';
import s from './register.module.less';
import {
	Button,
	Input,
	PasswordInput,
} from '@ya.praktikum/react-developer-burger-ui-components';

export function RegisterPage() {
	let auth = useAuth();
	const [form, setValue] = useState({ email: '', password: '' });

	const onChange = (e) => {
		setValue({ ...form, [e.target.name]: e.target.value });
	};

	let login = useCallback(
		(e) => {
			e.preventDefault();
			auth.signIn(form);
		},
		[auth, form]
	);

	if (auth.user) {
		return <Navigate to={'/'} />;
	}

	return (
		<div className='page_wrapper'>
			<div className='page_content'>
				<div className='page_content__left'></div>
				<div className='page_content__center'>
					<form className={s.form}>
						<div className={s.form_field}>
							<Input
								placeholder='Имя'
								value={form.email}
								name='name'
								onChange={onChange}
							/>
						</div>
						<div className={s.form_field}>
							<Input
								placeholder='Email'
								value={form.email}
								name='email'
								onChange={onChange}
							/>
						</div>
						<div className={s.form_field}>
							<Input
								placeholder='Логин'
								value={form.email}
								name='login'
								onChange={onChange}
							/>
						</div>
						<div className={s.form_field}>
							<PasswordInput
								placeholder='Пароль'
								value={form.password}
								name='password'
								onChange={onChange}
							/>
						</div>
						<div className={s.form_field}>
							<Button onClick={login} primary={true}>
								Зарегистрироваться
							</Button>
						</div>
					</form>
					<p className={s.form_comment}>
						Уже зарегистрированы? <Link to='/login'>Войти</Link>
					</p>
				</div>
				<div className='page_content__right'></div>
			</div>
		</div>
	);
}
