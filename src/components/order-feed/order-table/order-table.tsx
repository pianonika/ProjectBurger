import React from 'react';
import s from './order-table.module.less';
import { useAppSelector } from '@models/hooks';
import { getLiveTableState } from '@store/ordersLIst/slice';

export const OrderTable = ({}) => {
	const liveTableState = useAppSelector(getLiveTableState);
	return (
		<div>
			<div className={s.readiness}>
				<div className={s.readiness_column}>
					<h3 className='text text_type_main-medium'>Готовы:</h3>
					<ul className={s.readiness_list}>
						<li
							className={`${s.readiness_list_item} ${s.ready}  text text_type_digits-default`}>
							1234567890
						</li>
						<li
							className={`${s.readiness_list_item} ${s.ready} text text_type_digits-default`}>
							1234567890
						</li>
					</ul>
				</div>
				<div className={s.readiness_column}>
					<h3 className='text text_type_main-medium'>В работе:</h3>
					<ul className={s.readiness_list}>
						<li
							className={`${s.readiness_list_item} text text_type_digits-default`}>
							1234567890
						</li>
						<li
							className={`${s.readiness_list_item} text text_type_digits-default`}>
							1234567890
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
