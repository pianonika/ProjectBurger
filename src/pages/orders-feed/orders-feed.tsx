import React from 'react';
import OrderFeed from '@components/order-feed/order-feed';
import OrderTable from '@components/order-feed/order-table/order-table';
import s from '@pages/orders-feed/orders-feed.module.less';

export function OrderFeedPage() {
	return (
		<div className='page_wrapper'>
			<h1 className={`text text_type_main-large ${s.page_header}`}>
				Лента заказов
			</h1>
			<div className='page_content'>
				<div className={s.orders}>
					<OrderFeed></OrderFeed>
					<OrderTable></OrderTable>
				</div>
			</div>
		</div>
	);
}
