import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import s from './profile.module.less';
import {
	Button,
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
	const [isFormChanged, setIsFormChanged] = useState(false);

	const [form, setValue] = useState({
		password: '',
		name: user.name,
		email: user.email,
	});

	const onChange = (e) => {
		const previousValue = user[e.target.name];
		setValue({ ...form, [e.target.name]: e.target.value });
		if (previousValue !== e.target.value) {
			setIsFormChanged(true);
			console.log('isFormChanged', isFormChanged);
		}
	};

	if (!user) {
		navigate('/login');
	}

	const saveData = (e) => {
		e.preventDefault();
		dispatch(updateUser(JSON.stringify(form)));
	};
	const rollback = (e) => {
		e.preventDefault();
		setValue({ ...user });
		setIsFormChanged(false);
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
					/>
					<EditIcon className={s.form_field__editIcon} type='primary' />
				</div>
				<div className={s.form_field}>
					<Input
						placeholder='Логин'
						value={form.email}
						name='email'
						onChange={onChange}
						icon={'EditIcon'}
					/>
				</div>
				<div className={s.form_field}>
					<PasswordInput
						placeholder='Пароль'
						value={form.password}
						name='password'
						onChange={onChange}
						icon={'EditIcon'}
					/>
				</div>
				{isFormChanged && (
					<div className={`${s.form_field} ${s.form_buttons}`}>
						<Button
							htmlType='button'
							type='secondary'
							size='medium'
							onClick={rollback}>
							Отмена
						</Button>
						<Button
							htmlType='button'
							type='primary'
							size='medium'
							onClick={saveData}>
							Сохранить
						</Button>
					</div>
				)}
			</form>
			<div
				className={`${s.profile_comment} text text_type_main-default text_color_inactive`}>
				В этом разделе вы можете <br />
				изменить свои персональные данные
			</div>
		</Profile>
	);
}
