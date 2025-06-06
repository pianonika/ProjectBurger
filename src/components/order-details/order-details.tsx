import React from 'react';
import s from './order-details.module.less';
import { useAppSelector } from '@models/hooks';
import { useLocation } from 'react-router-dom';
import {
	CurrencyIcon,
	FormattedDate,
} from '@ya.praktikum/react-developer-burger-ui-components';
import { IngredientModel } from '@models/ingredient-model.model';

export const OrderDetails = () => {
	const order = useAppSelector((store) => store.order.currentOrder.order);
	const isRequestInProgress = useAppSelector(
		(store) => store.order.requestInProgress
	);
	const location = useLocation();
	const orderId = location.pathname.split('/')[2];
	const orderData = {
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
		price: '60',
	};
	const date = new Date(orderData.createdAt);
	const items: { [key: string]: IngredientModel } = useAppSelector(
		(state) => state.ingredients.defaultList
	);

	return !isRequestInProgress ? (
		<div className={s.order}>
			<div className={`${s.id} text text_type_digits-default`}>
				#{orderData._id}
			</div>
			<div className={`${s.name} text text_type_main-medium`}>
				{orderData.name}
			</div>
			<div className={`${s.status} text text_type_main-default`}>
				{orderData.status}
			</div>
			<div className={`${s.composition} text text_type_main-medium`}>
				Состав:
			</div>
			<table className={`${s.table} text text_type_main-medium`}>
				{orderData.ingredients &&
					orderData.ingredients.map((itemId: string, index: number) => (
						<tr key={`${itemId}${index}`} className={s.item}>
							<td>
								<img
									className={s.item_img}
									src={items?.[itemId]?.image_mobile}
									alt={items?.[itemId]?.name}
								/>
							</td>
							<td>
								<div className='text text_type_main-default'>
									{items?.[itemId]?.name}
								</div>
							</td>
							<td>
								<div className={`${s.item_currency}`}>
									<p className='text text_type_digits-default mr-2'>
										{items?.[itemId]?.count} X {items?.[itemId]?.price}
									</p>
									<CurrencyIcon type='primary' />
								</div>
							</td>
						</tr>
					))}
			</table>
			<div className={`${s.footer}`}>
				<div className={`${s.date} text text_type_main-default`}>
					<FormattedDate date={date} />
				</div>

				<div className={`${s.totalPrice}`}>
					<p className='text text_type_main-medium mr-2'>510</p>
					<CurrencyIcon type='primary' />
				</div>
			</div>

			{/*<p className={`${s.number} text text_type_digits-large`}>*/}
			{/*	{order?.number}*/}
			{/*</p>*/}
			{/*<p className='text text_type_main-medium mt-8 '>идентификатор заказа</p>*/}
			{/*<img*/}
			{/*	className={s.ingredient__icon}*/}
			{/*	src={orderCheckIcon}*/}
			{/*	alt='orderCheckIcon'*/}
			{/*/>*/}
			{/*<p className='text text_type_main-default'>Ваш заказ начали готовить</p>*/}
			{/*<p className='text text_type_main-default text_color_inactive  mt-2'>*/}
			{/*	Дождитесь готовности на орбитальной станции*/}
			{/*</p>*/}
		</div>
	) : (
		<div className={'preloader'}> ...wait </div>
	);
};

export default OrderDetails;
