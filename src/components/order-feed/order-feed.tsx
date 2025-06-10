import React, { FC, useEffect } from 'react';
import s from './order-feed.module.less';
import OrderFeedCard from '@components/order-feed/order-feed-card/order-feed-card';
import { Link, useLocation } from 'react-router-dom';
import { connect, disconnect } from '@store/ordersLIst/actions';
import { useAppDispatch, useAppSelector } from '@models/hooks';
import { OrderCard } from '@models/order';
import { getOrders } from '@store/ordersLIst/slice';

export const OrderFeed: FC<{
	isStatus?: boolean;
}> = ({ isStatus = false }) => {
	const location = useLocation();
	const dispatch = useAppDispatch();
	const orders: OrderCard[] = useAppSelector(getOrders);

	useEffect(() => {
		dispatch({
			type: connect,
		});
		// payload: `${BASE_URL}/orders`,
		return () => {
			dispatch({
				type: disconnect,
			});
		};
	}, [dispatch]);

	return (
		<div className={`custom-scroll ${s.list}`}>
			{!orders.length && '...loading'}
			{!!orders.length &&
				orders.map((order: any, index: number) => (
					<div className={s.orderFeedCard} key={index}>
						<Link
							key={`${order._id}`}
							to={`/orders/${order._id}`}
							state={{ modalLocation: location }}>
							<OrderFeedCard
								order={order}
								isStatus={isStatus}
								key={`${order._id} + ${index}`}></OrderFeedCard>
						</Link>
					</div>
				))}
		</div>
	);
};

export default OrderFeed;
