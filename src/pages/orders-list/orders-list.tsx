import React from 'react';
import s from './orders-list.module.less';
import Profile from '@components/profile/profile';

export function OrderListPage() {
	return (
		<Profile title={'OrderListPage'}>
			<div className={s.orders}>Some info about orders</div>
		</Profile>
	);
}
