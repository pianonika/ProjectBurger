import React from 'react';
import s from './order-table.module.less';
import { useAppSelector } from '@models/hooks';
import { getLiveTableState } from '@store/ordersList/slice';
import { OrderCard } from '@models/order';

export const OrderTable = ({}) => {
	const liveTableState = useAppSelector(getLiveTableState);
	const orders = liveTableState?.orders
		.filter((i) => i.status == 'done')
		.splice(0, 8);
	return (
		<div>
			<div className={s.readiness}>
				<div className={s.readiness_column}>
					<h3 className='text text_type_main-medium'>Готовы:</h3>
					<ul className={s.readiness_list}>
						{!!orders.length &&
							orders.map((order: OrderCard, index: number) => (
								<li
									key={`${order._id}${index}`}
									className={`${s.readiness_list_item} ${s.ready}  text text_type_digits-default`}>
									{order.number}
								</li>
							))}
					</ul>
				</div>
				<div className={s.readiness_column}>
					<h3 className='text text_type_main-medium'>В работе:</h3>
					<ul className={s.readiness_list}>
						<li
							className={`${s.readiness_list_item} text text_type_digits-default`}>
							80841
						</li>
						<li
							className={`${s.readiness_list_item} text text_type_digits-default`}>
							80840
						</li>
					</ul>
				</div>
			</div>
			<div className={s.counter}>
				<p className='text text_type_main-large'>Выполнено за все время:</p>
				<p className='text text_type_digits-large'>{liveTableState.total}</p>
			</div>
			<div className={s.counter}>
				<p className='text text_type_main-large'>Выполнено за сегодня:</p>
				<p className='text text_type_digits-large'>
					{liveTableState.totalToday}
				</p>
			</div>
		</div>
	);
};

export default OrderTable;
