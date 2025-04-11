import React from 'react';
import s from './profile-menu.module.less';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { useAppDispatch } from '@models/hooks';
import { logoutRequest } from '@store/auth/action';

export const ProfileMenu = ({}) => {
	const dispatch = useAppDispatch();
	const navigate = useNavigate();

	const logout = (e: any) => {
		e.preventDefault();
		dispatch(logoutRequest());
	};
	return (
		<ul className={s.profile_menu}>
			<li className={`${s.profile_menu__item} text text_type_main-medium`}>
				<NavLink
					className={({ isActive }) =>
						isActive ? `${s.link__active} ${s.link}` : `${s.link}`
					}
					to='/profile'
					end>
					Профиль
				</NavLink>
			</li>
			<li className={`${s.profile_menu__item} text text_type_main-medium`}>
				<NavLink
					className={({ isActive }) =>
						isActive ? `${s.link__active} ${s.link}` : `${s.link}`
					}
					to='/profile/orders'>
					История заказов
				</NavLink>
			</li>
			<li className={`${s.profile_menu__item} text text_type_main-medium`}>
				<div className={s.link} onClick={logout} role='button'>
					Выход
				</div>
			</li>
		</ul>
	);
};

export default ProfileMenu;
