import React, { FC, useEffect } from 'react';
import s from './order-feed.module.less';
import OrderFeedCard from '@components/order-feed/order-feed-card/order-feed-card';
import { Link, useLocation } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '@models/hooks';
import { OrderCard } from '@models/order';
import { getOrders } from '@store/ordersList/slice';
import { connect, disconnect } from '@store/ordersList/actions';
import {
	userListConnect,
	userListDisconnect,
} from '@store/ordersListForUser/actions';
import { getUserOrders } from '@store/ordersListForUser/slice';

export const OrderFeed: FC<{
	isStatus?: boolean;
	isProfilePage?: boolean;
}> = ({ isStatus = false, isProfilePage = false }) => {
	const location = useLocation();
	const dispatch = useAppDispatch();
	const orders: OrderCard[] = useAppSelector(
		isProfilePage ? getUserOrders : getOrders
	);
	const calcLink = (id) => {
		return isProfilePage ? `/profile/orders/${id}` : `/feed/${id}`;
	};

	useEffect(() => {
		isProfilePage
			? dispatch({
					type: userListConnect,
			  })
			: dispatch({
					type: connect,
			  });
		// payload: `${BASE_URL}/orders`,
		return () => {
			isProfilePage
				? dispatch({
						type: userListDisconnect,
				  })
				: dispatch({
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
							to={calcLink(order.number)}
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
