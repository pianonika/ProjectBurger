import React from 'react';
import s from './order-details.module.less';
import orderCheckIcon from '../../images/orderCheck.svg';
import { useAppSelector } from '@models/hooks';

export const OrderDetails = () => {
	const order = useAppSelector((store) => store.order.currentOrder.order);
	const isRequestInProgress = useAppSelector(
		(store) => store.order.requestInProgress
	);

	return !isRequestInProgress ? (
		<div className={s.ingredient__details}>
			<p className={`${s.number} text text_type_digits-large`} data-testid='order-number'>
				{order?.number}
			</p>
			<p className='text text_type_main-medium mt-8 '>идентификатор заказа</p>
			<img
				className={s.ingredient__icon}
				src={orderCheckIcon}
				alt='orderCheckIcon'
			/>
			<p className='text text_type_main-default'>Ваш заказ начали готовить</p>
			<p className='text text_type_main-default text_color_inactive  mt-2'>
				Дождитесь готовности на орбитальной станции
			</p>
		</div>
	) : (
		<div className={'preloader'}> ...wait </div>
	);
};

export default OrderDetails;
