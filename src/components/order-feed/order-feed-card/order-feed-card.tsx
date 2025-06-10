import React, { FC, useState } from 'react';
import s from './order-feed-card.module.less';
import { OrderCard } from '@models/order';
import {
	CurrencyIcon,
	FormattedDate,
} from '@ya.praktikum/react-developer-burger-ui-components';
import { IngredientModel } from '@models/ingredient-model.model';
import { useAppDispatch, useAppSelector } from '@models/hooks';
import { translations } from '@store/vars';
import { SET_ORDER_CURR_CARD } from '@store/order/action';

export const OrderFeedCard: FC<{
	order: OrderCard;
	isStatus: boolean;
}> = ({ order, isStatus = false }) => {
	const dispatch = useAppDispatch();
	const date = new Date(order.createdAt);
	const items: { [key: string]: IngredientModel } = useAppSelector(
		(state) => state.ingredients.defaultList
	);

	const totalPrice = order.ingredients.reduce(
		(acc, ingredient) => items[ingredient].price + acc,
		0
	);
	const ingregientsLimit = 6;
	const [orderIngredients] = useState(
		order.ingredients.slice(0, ingregientsLimit)
	);
	const excessIngregientsLimit = orderIngredients.length - ingregientsLimit + 1;
	const isShowIngregientsTale = excessIngregientsLimit > 0;

	const saveOrderForModal = () => {
		dispatch({
			type: SET_ORDER_CURR_CARD,
			payload: order,
		});
	};

	// useEffect(() => {
	// 	return () => {
	// 		dispatch({
	// 			type: DELETE_ORDER_CURR_CARD,
	// 		});
	// 	};
	// }, []);

	return (
		<div className={s.orderCard} onClick={() => saveOrderForModal()}>
			<div className={s.orderCard_header}>
				<p className='text text_type_digits-default orderCard_id'>
					#{order.number}
				</p>
				<div className={s.date}>
					<FormattedDate date={date} />
				</div>
			</div>
			<div className={`text text_type_main-medium ${s.orderCard_name}`}>
				{order.name}
			</div>
			{isStatus && (
				<div className={`${s.orderCard_status} text text_type_main-default`}>
					{translations[order.status]}
				</div>
			)}
			<div className={s.orderCard_footer}>
				<div className={s.orderCard_ingredients}>
					{orderIngredients &&
						orderIngredients.map((itemId: string, index: number) => (
							<div
								key={`${itemId}${index}`}
								className={s.orderCard_ingredients_item}>
								<img
									className={s.orderCard_ingredients_img}
									src={items?.[itemId]?.image_mobile}
									alt={items?.[itemId]?.name}
								/>
								{isShowIngregientsTale && index == ingregientsLimit - 1 && (
									<div className={s.hover}>+{excessIngregientsLimit}</div>
								)}
							</div>
						))}
				</div>
				<div className={s.orderCard_price}>
					<p className='text text_type_digits-default mr-2'>{totalPrice}</p>
					<CurrencyIcon type='primary' />
				</div>
			</div>
		</div>
	);
};

export default OrderFeedCard;
