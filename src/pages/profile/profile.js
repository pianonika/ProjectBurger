import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import s from './profile.module.less';
import {
	EditIcon,
	Input,
	PasswordInput,
} from '@ya.praktikum/react-developer-burger-ui-components';
import { useSelector } from 'react-redux';
import { updateUser } from '@store/auth/action';
import { useAppDispatch } from '@models/hooks';
import Profile from '@components/profile/profile';

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

	const saveData = (e) => {
		dispatch(updateUser(JSON.stringify({ [e.target.name]: e.target.value })));
	};

	return (
		<Profile title={'Вход'}>
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
		</Profile>
	);
}
