import React, { useState } from 'react';
import { Link, Navigate } from 'react-router-dom';
import s from './register.module.less';
import {
	Button,
	Input,
	PasswordInput,
} from '@ya.praktikum/react-developer-burger-ui-components';
import { useAppDispatch } from '@models/hooks';
import { register } from '@store/auth/action';

export function RegisterPage() {
	const dispatch = useAppDispatch();
	const [form, setValue] = useState({
		data: {
			email: '',
			password: '',
			name: '',
			passwordRepeat: '',
		},
		errors: {},
		isValid: true,
	});

	const onChange = (e) => {
		setValue({ ...form, [e.target.name]: e.target.value });
	};

	const submit = (e) => {
		const data = {
			email: form.email,
			password: form.password,
			name: form.name,
		};
		e.preventDefault();
		dispatch(register(data));
	};

	const checkValidPasswordRepeat = () => {
		return form.password === form.passwordRepeat;
	};

	return (
		<div className='page_wrapper'>
			<h1 className='text text_type_main-medium page_header'>Регистрация</h1>
			<div className='page_content'>
				<div className='page_content__left'></div>
				<div className='page_content__center'>
					<form className={s.form}>
						<div className={s.form_field}>
							<Input
								placeholder='Имя'
								value={form.name}
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
								placeholder='Пароль'
								value={form.password}
								name='password'
								onChange={onChange}
								checkValid={checkValidPasswordRepeat}
							/>
						</div>
						<div className={s.form_field}>
							<PasswordInput
								placeholder='Пароль'
								value={form.passwordRepeat}
								name='passwordRepeat'
								onChange={onChange}
								checkValid={checkValidPasswordRepeat}
								errorText='Пароли не совпадают'
							/>
						</div>
						<div className={s.form_field}>
							<Button onClick={submit} primary={true}>
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
