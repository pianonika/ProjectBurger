import React, { useEffect } from 'react';
import s from './order-details.module.less';
import orderCheckIcon from '../../images/orderCheck.svg';
import { useAppDispatch, useAppSelector } from '../../models/hooks';
import { CLEAR_ORDER_INFO } from '../../services/order/action';

export const OrderDetails = () => {
	const order = useAppSelector((store) => store.order.currentOrder.order);
	const dispatch = useAppDispatch();

	useEffect(() => {
		return () => {
			console.log('CLEAR_ORDER_INFO');
			dispatch({
				type: CLEAR_ORDER_INFO,
			});
		};
	}, []);

	return order.number && (
		<div className={s.ingredient__details}>
			<p className={`${s.number} text text_type_digits-large`}>
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
	) ;
	// 	: (
	// 	<img src={'../../images/preloader.png'} alt={'preloader'} />
	// )

};

export default OrderDetails;
