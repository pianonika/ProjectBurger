import React from 'react';
import s from './app-header.module.less';
import {
	BurgerIcon,
	ListIcon,
	Logo,
	ProfileIcon,
} from '@ya.praktikum/react-developer-burger-ui-components';

export const AppHeader = ({}) => {
	return (
		<header className={s.header}>
			<nav className={s.header__inner}>
				<div className={s.header__buttons}>
					<a className={`${s.link__active} ${s.link} `} href='/'>
						<BurgerIcon type='primary' className={s.link_logo} />
						Конструктор
					</a>
					<a className={s.link} href='/'>
						<ListIcon type='secondary' className={s.link_logo} /> Лента заказов
					</a>
				</div>
				<Logo className={s.logo} />
				<div className={s.header__buttons}>
					<a className={s.link} href='/'>
						<ProfileIcon type='secondary' className={s.link_logo} /> Личный
						кабинет
					</a>
				</div>
			</nav>
		</header>
	);
};

export default AppHeader;
