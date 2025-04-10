import React from 'react';
import s from './orders-list.module.less';

export function OrderListPage() {
	return (
		<div className='page_wrapper'>
			<h1 className='text text_type_main-medium page_header'>Orders</h1>
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
				</div>
				<div className='page_content__center'>OrderListPage</div>
				<div className='page_content__right'></div>
			</div>
		</div>
	);
}
