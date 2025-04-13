import React, { MouseEventHandler } from 'react';
import s from './profile-menu.module.less';
import { NavLink } from 'react-router-dom';
import { useAppDispatch } from '@models/hooks';
import { logoutRequest } from '@store/auth/action';

export const ProfileMenu = ({}) => {
	const dispatch = useAppDispatch();
	const logout: (e: MouseEventHandler<HTMLButtonElementElement>) => void = (e) => {
		e.preventDefault();
		dispatch(logoutRequest());
	};
	return (
		<>
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
					<button className={s.button_link} onClick={logout} tabIndex={0}>
						Выход
					</button>
				</li>
			</ul>
		</>
	);
};

export default ProfileMenu;
