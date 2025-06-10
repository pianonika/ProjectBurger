import React, { useEffect, useState } from 'react';
import s from './order-feed-details.module.less';
import { useAppDispatch, useAppSelector } from '@models/hooks';
import {
	CurrencyIcon,
	FormattedDate,
} from '@ya.praktikum/react-developer-burger-ui-components';
import { IngredientModel } from '@models/ingredient-model.model';
import { useParams } from 'react-router-dom';
import { OrderCard } from '@models/order';
import { getUserOrders } from '@store/ordersListForUser/slice';
import { getOrders } from '@store/ordersList/slice';
import { getCurrOrderCard } from '@store/order/reducer';
import { translations } from '@store/vars';
import { DELETE_ORDER_CURR_CARD, getOrderInfo } from '@store/order/action';

export const OrderFeedDetails = () => {
	const dispatch = useAppDispatch();
	const { numberId } = useParams<'numberId'>();
	const ingredients: { [key: string]: IngredientModel } = useAppSelector(
		(state) => state.ingredients.defaultList
	);
	const userOrdersList: OrderCard[] = useAppSelector(getUserOrders);
	const ordersList: OrderCard[] = useAppSelector(getOrders);
	const currOrderCard: OrderCard | null = useAppSelector(getCurrOrderCard);
	const [currOrder, setCurrOrder] = useState<OrderCard | null>(null);
	const [list, setList] = useState<{
		[key: string]: { price?: number; count?: number };
	} | null>(null);
	const saveOrderForModal = () => {
		if (currOrderCard) {
			setCurrOrder(currOrderCard);
			return;
		}
		if (userOrdersList?.length) {
			findInList(userOrdersList);
		}
		if (ordersList?.length) {
			findInList(ordersList);
		}
		requestOrderInfo();
	};
	const requestOrderInfo = () => {
		numberId && dispatch(getOrderInfo(numberId));
	};
	const findInList = (list) => {
		const foundEl = list.find((order) => {
			order.number === numberId;
		});
		if (foundEl) {
			setCurrOrder(foundEl);
			return;
		}
	};
	const date = currOrder ? new Date(currOrder?.createdAt) : new Date();
	const isRequestInProgress = useAppSelector(
		(store) => store.order.requestInProgress
	);
	useEffect(() => {
		saveOrderForModal();
		return () => {
			dispatch({
				type: DELETE_ORDER_CURR_CARD,
			});
		};
	}, []);
	useEffect(() => {
		if (currOrder) {
			calcCartData();
		}
	}, [currOrder]);
	useEffect(() => {
		if (currOrderCard) {
			setCurrOrder(currOrderCard);
		}
	}, [currOrderCard]);

	const calcTotalPrice = () =>
		currOrder?.ingredients?.reduce(
			(acc, ingredient) => ingredients[ingredient].price + acc,
			0
		);
	const calcCartData = () => {
		if (currOrder) {
			const listItems = currOrder.ingredients.reduce((acc, curEl) => {
				const currValue = !!acc[curEl] ? acc[curEl].count + 1 : 1;
				return { ...acc, [curEl]: { count: currValue } };
			}, {});
			Object.keys(listItems).map(
				(key) =>
					(listItems[key] = {
						...listItems[key],
						price: ingredients[key].price,
					})
			);
			setList(listItems);
		}
	};

	return !isRequestInProgress && currOrder ? (
		<div className={s.modal_content}>
			<div className={s.order}>
				<div className={`${s.id} text text_type_digits-default`}>
					#{currOrder.number}
				</div>
				<div className={`${s.name} text text_type_main-medium`}>
					{currOrder.name}
				</div>
				<div className={`${s.status} text text_type_main-default`}>
					{translations[currOrder.status]}
				</div>
				<div className={`${s.composition} text text_type_main-medium`}>
					Состав:
				</div>
				<div className={`${s.tableWrapper} custom-scroll`}>
					<table className={`${s.table} text text_type_main-medium`}>
						{currOrder.ingredients &&
							currOrder.ingredients.map((itemId: string, index: number) => (
								<tr key={`${itemId}${index}`}>
									<td>
										<img
											className={s.item_img}
											src={ingredients?.[itemId]?.image_mobile}
											alt={ingredients?.[itemId]?.name}
										/>
									</td>
									<td>
										<div className='text text_type_main-default'>
											{ingredients?.[itemId]?.name}
										</div>
									</td>
									<td>
										{list && (
											<div className={`${s.item_currency}`}>
												<p className='text text_type_digits-default mr-2'>
													{list?.[itemId]?.count} X {list?.[itemId]?.price}
												</p>
												<CurrencyIcon type='primary' />
											</div>
										)}
									</td>
								</tr>
							))}
					</table>
				</div>
				<div className={`${s.footer}`}>
					<div className={`${s.date} text text_type_main-default`}>
						<FormattedDate date={date} />
					</div>

					<div className={`${s.totalPrice}`}>
						<p className='text text_type_main-medium mr-2'>
							{calcTotalPrice()}
						</p>
						<CurrencyIcon type='primary' />
					</div>
				</div>
			</div>
		</div>
	) : (
		<div className={'preloader'}> ...wait </div>
	);
};

export default OrderFeedDetails;
