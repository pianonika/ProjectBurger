import React, { useCallback, useState } from 'react';
import {Link, Navigate, useNavigate} from 'react-router-dom';
import s from './profile.module.less';
import {
	EditIcon,
	Input,
	PasswordInput,
} from '@ya.praktikum/react-developer-burger-ui-components';
import { useSelector } from 'react-redux';
import { loginRequest, logoutRequest, updateUser } from '@store/auth/action';
import { useAppDispatch } from '@models/hooks';

export function ProfilePage() {
	const user = useSelector((state) => state.authorization.user);
	const dispatch = useAppDispatch();
	const navigate = useNavigate();

	const [form, setValue] = useState({
		password: user.password,
		name: user.name,
		email: user.email,
	});

	const onChange = (e) => {
		const previousValue = form[e.target.name];
		setValue({ ...form, [e.target.name]: e.target.value });
		if (previousValue === e.target.value) {
			saveData(e);
		}
	};

	if (!user) {
		navigate('/login');
	}

	const logout = (e) => {
		e.preventDefault();
		dispatch(logoutRequest());
		navigate('/login');
	};

	const saveData = (e) => {
		dispatch(updateUser(JSON.stringify({ [e.target.name]: e.target.value })));
	};

	return (
		<div className='page_wrapper'>
			<h1 className='text text_type_main-medium page_header'>Вход</h1>
			<div className='page_content'>
				<div className='page_content__left'>
					<ul className={s.profile_menu}>
						<li
							className={`${s.profile_menu__item} ${s.active} text text_type_main-medium`}>
							Профиль
						</li>
						<li
							className={`${s.profile_menu__item} text text_type_main-medium`}>
							{/*/profile/orders/:number*/}
							История заказов
						</li>
						<li
							className={`${s.profile_menu__item} text text_type_main-medium`}
							onClick={logout}>
							Выход
						</li>
					</ul>
					<div className={`${s.profile_comment} text text_type_main-default text_color_inactive`}>
						В этом разделе вы можете <br/>
						изменить свои персональные данные
					</div>
				</div>
				<div className='page_content__center'>
					<form className={s.form}>
						<div className={s.form_field}>
							<Input
								placeholder='Имя'
								value={form.name}
								name='name'
								onChange={onChange}
								onBlur={saveData}
							/>
							<EditIcon className={s.form_field__editIcon} type='primary' />
						</div>
						<div className={s.form_field}>
							<Input
								placeholder='Логин'
								value={form.email}
								name='email'
								onChange={onChange}
								onBlur={saveData}
								icon={'EditIcon'}
							/>
						</div>
						<div className={s.form_field}>
							<PasswordInput
								placeholder='Пароль'
								value={form.password}
								name='password'
								onChange={onChange}
								onBlur={saveData}
								icon={'EditIcon'}
							/>
						</div>
					</form>
				</div>
				<div className='page_content__right'></div>
			</div>
		</div>
	);
}
