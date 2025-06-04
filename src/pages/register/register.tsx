import React, { SyntheticEvent } from 'react';
import { Link } from 'react-router-dom';
import s from './register.module.less';
import {
	Button,
	Input,
	PasswordInput,
} from '@ya.praktikum/react-developer-burger-ui-components';
import { useAppDispatch } from '@models/hooks';
import { register } from '@store/auth/action';
import { useForm } from '../../hooks/useForm';

export function RegisterPage() {
	const dispatch = useAppDispatch();
	const { values, handleChange } = useForm({
		email: '',
		password: '',
		name: '',
		passwordRepeat: '',
		isValid: 'true',
	});

	const submitForm = (e: SyntheticEvent<HTMLFormElement>) => {
		const data = {
			email: values.email,
			password: values.password,
			name: values.name,
		};
		e.preventDefault();
		dispatch(register(data));
	};

	const checkValidPasswordRepeat: () => boolean = () => {
		return values.password === values.passwordRepeat;
	};

	return (
		<div className='page_wrapper'>
			<h1 className='text text_type_main-medium page_header'>Регистрация</h1>
			<div className='page_content'>
				<div className='page_content__left'></div>
				<div className='page_content__center'>
					<form className={s.form} onSubmit={submitForm}>
						<div className={s.form_field}>
							<Input
								placeholder='Имя'
								value={values.name}
								name='name'
								onChange={handleChange}
							/>
						</div>
						<div className={s.form_field}>
							<Input
								placeholder='Email'
								value={values.email}
								name='email'
								onChange={handleChange}
							/>
						</div>
						<div className={s.form_field}>
							<Input
								placeholder='Пароль'
								value={values.password}
								name='password'
								onChange={handleChange}
							/>
						</div>
						<div className={s.form_field}>
							<PasswordInput
								placeholder='Пароль'
								value={values.passwordRepeat}
								name='passwordRepeat'
								onChange={handleChange}
								checkValid={checkValidPasswordRepeat}
								errorText='Пароли не совпадают'
							/>
						</div>
						<div className={s.form_field}>
							<Button htmlType={'submit'} type={'primary'}>
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
