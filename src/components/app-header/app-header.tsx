import React from 'react';
import s from './app-header.module.less';
import {
	BurgerIcon,
	ListIcon,
	Logo,
	ProfileIcon,
} from '@ya.praktikum/react-developer-burger-ui-components';
import { Link, NavLink } from 'react-router-dom';

export const AppHeader = ({}) => {
	return (
		<header className={s.header}>
			<nav className={s.header__inner}>
				<div className={s.header__buttons}>
					<NavLink
						className={({ isActive }) =>
							isActive ? `${s.link__active} ${s.link}` : `${s.link}`
						}
						to='/'>
						<BurgerIcon type='primary' className={s.link_logo} />
						Конструктор
					</NavLink>
					<NavLink
						className={({ isActive }) =>
							isActive ? `${s.link__active} ${s.link}` : `${s.link}`
						}
						to='/profile/feed'>
						<ListIcon type='secondary' className={s.link_logo} />
						Лента заказов
					</NavLink>
				</div>
				<Link to='/' className={s.logo}>
					<Logo />
				</Link>
				<div className={s.header__buttons}>
					<NavLink
						className={({ isActive }) =>
							isActive ? `${s.link__active} ${s.link}` : `${s.link}`
						}
						to='/profile'>
						<ProfileIcon type='secondary' className={s.link_logo} /> Личный
						кабинет
					</NavLink>
				</div>
			</nav>
		</header>
	);
};

export default AppHeader;
