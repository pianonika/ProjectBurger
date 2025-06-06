import React, { FC } from 'react';
import s from './order-feed-card.module.less';
import { OrderCard } from '@models/order';
import {
	CurrencyIcon,
	FormattedDate,
} from '@ya.praktikum/react-developer-burger-ui-components';
import { IngredientModel } from '@models/ingredient-model.model';
import { useAppSelector } from '@models/hooks';

export const OrderFeedCard: FC<{
	order: OrderCard;
}> = ({ order }) => {
	const date = new Date(order.createdAt);
	const items: { [key: string]: IngredientModel } = useAppSelector(
		(state) => state.ingredients.defaultList
	);

	return (
		<div className={s.orderCard}>
			<div className={s.orderCard_header}>
				<p className='text text_type_digits-default orderCard_id'>
					#{order._id}
				</p>
				<FormattedDate date={date} />
			</div>
			<div className={`text text_type_main-medium ${s.orderCard_name}`}>
				{order.name}
			</div>
			<div className='orderCard_status text text_type_main-default'>
				{order.status}
			</div>
			<div className={s.orderCard_footer}>
				<div className={s.orderCard_ingredients}>
					{order.ingredients &&
						order.ingredients.map((itemId: string, index: number) => (
							<div
								key={`${itemId}${index}`}
								className={s.orderCard_ingredients_item}>
								<img
									className={s.orderCard_ingredients_img}
									src={items?.[itemId]?.image_mobile}
									alt={items?.[itemId]?.name}
								/>
							</div>
						))}
				</div>
				<div className={s.orderCard_price}>
					<p className='text text_type_digits-medium mr-2'>560</p>
					<CurrencyIcon type='primary' />
				</div>
			</div>
		</div>
	);
};

export default OrderFeedCard;
