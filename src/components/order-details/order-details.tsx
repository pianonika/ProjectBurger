import React from 'react';
import s from './order-details.module.less';
import orderCheckIcon from '../../images/orderCheck.svg';

export const OrderDetails = ({ detailsData }: { detailsData: string }) => {
	return (
		<div className={s.ingredient__details}>
			<p className={`${s.number} text text_type_digits-large`}>{detailsData}</p>
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
	);
};

export default OrderDetails;
