import React from 'react';
import Profile from '@components/profile/profile';
import s from './orders-history.module.less';
import OrderFeed from '@components/order-feed/order-feed';

export function OrderHistoryPage() {
	return (
		<Profile>
			<div className={s.orders}>
				<OrderFeed isStatus={true} isProfilePage={true}></OrderFeed>
			</div>
		</Profile>
	);
}
