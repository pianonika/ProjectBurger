import React, { SyntheticEvent } from 'react';
import { Link } from 'react-router-dom';
import s from './login.module.less';
import {
	Button,
	Input,
	PasswordInput,
} from '@ya.praktikum/react-developer-burger-ui-components';
import { useAppDispatch } from '@models/hooks';
import { loginRequest } from '@store/auth/action';
import { useForm } from '../../hooks/useForm';

export function LoginPage() {
	const dispatch = useAppDispatch();
	const { values, handleChange } = useForm({ email: '', password: '' });

	const login = (e: SyntheticEvent<HTMLFormElement>) => {
		e.preventDefault();
		dispatch(loginRequest(values));
	};

	return (
		<div className='page_wrapper'>
			<h1 className='text text_type_main-medium page_header'>Вход</h1>
			<div className='page_content'>
				<div className='page_content__left'></div>
				<div className='page_content__center'>
					<form className={s.form} onSubmit={login}>
						<div className={s.form_field} data-testid='email_input'>
							<Input
								placeholder='Email'
								value={values.email}
								name='email'
								onChange={handleChange}
							/>
						</div>
						<div className={s.form_field} data-testid='password_input'>
							<PasswordInput
								placeholder='Password'
								value={values.password}
								name='password'
								onChange={handleChange}
							/>
						</div>
						<div className={s.form_field}>
							<Button htmlType={'submit'} type={'primary'}>
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
