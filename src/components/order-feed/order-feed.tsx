import React from 'react';
import s from './order-feed.module.less';
import OrderFeedCard from '@components/order-feed/order-feed-card/order-feed-card';
import { Link, useLocation } from 'react-router-dom';
import IngredientCard from '@components/ingredient-card/ingredient-card';

export const OrderFeed = ({}) => {
	const location = useLocation();
	const data = {
		success: true,
		orders: [
			{
				ingredients: [
					'643d69a5c3f7b9001cfa093c',
					'643d69a5c3f7b9001cfa093f',
					'643d69a5c3f7b9001cfa093d',
				],
				_id: '034535',
				status: 'done',
				number: 1,
				name: 'Death Star Starship Main бургер',
				createdAt: '2021-06-23T20:11:01.403Z',
				updatedAt: '2021-06-23T20:11:01.406Z',
			},
			{
				ingredients: ['643d69a5c3f7b9001cfa0946'],
				_id: '034535',
				status: 'done',
				number: 3,
				createdAt: '2021-06-23T20:13:23.654Z',
				updatedAt: '2021-06-23T20:13:23.657Z',
			},
		],
		total: 2,
		totalToday: 2,
	};
	return (
		<div className={s.list}>
			{data?.orders &&
				data.orders.map((order: any, index: number) => (
					<div className={s.orderFeedCard} key={index}>
						<Link
							key={`${order._id}`}
							to={`/orders/${order._id}`}
							state={{ modalLocation: location }}>
							<OrderFeedCard
								order={order}
								key={`${order._id} + ${index}`}></OrderFeedCard>
						</Link>
					</div>
				))}
		</div>
	);
};

export default OrderFeed;
