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
import { useForm } from '../../hooks/useForm';

export function ProfilePage() {
	const user = useSelector((state) => state.authorization.user);
	const dispatch = useAppDispatch();
	const navigate = useNavigate();
	const [isFormChanged, setIsFormChanged] = useState(false);
	const { values, setValues } = useForm({
		password: '',
		name: user.name,
		email: user.email,
		isFormChanged: false,
	});

	const onChange = (e) => {
		const previousValue = user[e.target.name];
		setValues({ ...values, [e.target.name]: e.target.value });
		if (previousValue !== e.target.value) {
			setIsFormChanged(true);
		}
	};

	if (!user) {
		navigate('/login');
	}

	const saveData = (e) => {
		e.preventDefault();
		dispatch(updateUser(JSON.stringify(values)));
		setIsFormChanged(false);
	};
	const rollback = (e) => {
		e.preventDefault();
		setValues({ ...user });
		setIsFormChanged(false);
	};

	return (
		<Profile title={'Вход'}>
			<form className={s.form} onSubmit={saveData}>
				<div className={s.form_field}>
					<Input
						placeholder='Имя'
						value={values.name}
						name='name'
						onChange={onChange}
					/>
					<EditIcon className={s.form_field__editIcon} type='primary' />
				</div>
				<div className={s.form_field}>
					<Input
						placeholder='Логин'
						value={values.email}
						name='email'
						onChange={onChange}
						icon={'EditIcon'}
					/>
				</div>
				<div className={s.form_field}>
					<PasswordInput
						placeholder='Пароль'
						value={values.password}
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
						<Button type='primary' size='medium' htmlType={'submit'}>
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
