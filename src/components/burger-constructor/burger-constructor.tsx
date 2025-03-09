import React, { useMemo, useState } from 'react';
import s from './burger-constructor.module.less';
import {
	Button,
	ConstructorElement,
	CurrencyIcon,
	DragIcon,
} from '@ya.praktikum/react-developer-burger-ui-components';
import Modal from '../modal/modal';
import OrderDetails from '../order-details/order-details';
import { IngredientModel } from '../../models/ingredient-model.model';
import { useAppDispatch, useAppSelector } from '../../models/hooks';
import { CartModel } from '../../models/cart';
import { REMOVE_FILLINGS_ITEM } from '../../services/cart/action';
import { sendOrder } from '../../services/order/action';
import { DECREMENT_INGREDIENTS_COUNT } from '../../services/ingredients/action';

export const BurgerConstructor = () => {
	// const dispatch = useAppDispatch();
	const [isModalVisible, setModalActive] = useState(false);
	const chosenIngredients = useAppSelector((store) => store.cart) as CartModel;
	const dispatch = useAppDispatch();

	const handleIngredientClick = () => {
		const isBun = chosenIngredients.bun._id;
		const isFillings = !!chosenIngredients.fillings.length;
		if (isBun && isFillings) {
			const requestData = calcIngredientsRequestData();
			dispatch(sendOrder(requestData));
			setModalActive(true);
		}
		!isBun && alert('Нужно выбрать булку');
		isBun && !isFillings && alert('Нужно выбрать начинку');
	};

	const totalPrice = useMemo(() => {
		const fillingsPrice = chosenIngredients?.fillings?.[0]?.price
			? chosenIngredients?.fillings?.reduce(
					(acc: number, curr: IngredientModel) => acc + curr.price,
					0
			  )
			: 0;
		const bunPrice = chosenIngredients?.bun?.price ?? 0;
		return fillingsPrice + bunPrice;
	}, [chosenIngredients]);

	const deleteIngredient = (deleteIngredient: IngredientModel) => {
		dispatch({
			type: REMOVE_FILLINGS_ITEM,
			payload: deleteIngredient.uuid,
		});
		dispatch({
			type: DECREMENT_INGREDIENTS_COUNT,
			payload: deleteIngredient,
		});
	};

	const calcIngredientsRequestData = () => {
		const bunId = chosenIngredients.bun._id;
		const fillingsIds: string[] = chosenIngredients.fillings.map((i) => i._id);

		fillingsIds.unshift(bunId);
		fillingsIds.push(bunId);
		return JSON.stringify({ ingredients: fillingsIds });
	};

	return (
		<div className={s.burgerConstructor}>
			<div className={s.chosenIngredients}>
				<div className={`${s.constructorItem} pr-4`}>
					{chosenIngredients?.bun?.name ? (
						<ConstructorElement
							type='top'
							isLocked={true}
							text={`${chosenIngredients.bun.name}  (верх)`}
							price={chosenIngredients.bun.price}
							thumbnail={chosenIngredients.bun.image}
						/>
					) : (
						<div
							className={`constructor-element constructor-element_pos_top ${s.emptyIngredient}`}>
							<span className={'constructor-element__row'}>Выберите булку</span>
						</div>
					)}
				</div>
				<div className={`${s.fillings} pr-4`}>
					{chosenIngredients?.fillings?.length ? (
						chosenIngredients?.fillings?.map(
							(ingredient: IngredientModel, key: number) => (
								<div
									className={`${s.constructorItem} ${s.constructorItem__draggable}`}
									key={`${ingredient._id}+${key}`}>
									<div className={s.constructorItemIcon}>
										<DragIcon type='primary' />
									</div>
									<ConstructorElement
										text={ingredient.name}
										price={ingredient.price}
										thumbnail={ingredient.image}
										handleClose={() => deleteIngredient(ingredient)}
									/>
								</div>
							)
						)
					) : (
						<div className={`${s.constructorItem}  ${s.emptyFillings}`}>
							<div className={`constructor-element ${s.emptyFillings__inner}`}>
								<span className='constructor-element__row'>
									Добавь ингридиенты{' '}
								</span>
							</div>
						</div>
					)}
				</div>

				<div className={s.constructorItem}>
					{chosenIngredients?.bun?.name ? (
						<ConstructorElement
							type='bottom'
							isLocked={true}
							text={`${chosenIngredients.bun.name}  (низ)`}
							price={chosenIngredients.bun.price}
							thumbnail={chosenIngredients.bun.image}
						/>
					) : (
						<div
							className={`constructor-element constructor-element_pos_bottom ${s.emptyIngredient}`}>
							<span className={'constructor-element__row'}>Выберите булку</span>
						</div>
					)}
				</div>
			</div>

			<div className={`${s.total} pt-10`}>
				<div className={`${s.cost} mr-10`}>
					<p className='text text_type_digits-medium mr-2'>{totalPrice}</p>
					<CurrencyIcon type='primary' />
				</div>
				<Button
					htmlType='button'
					type='primary'
					size='large'
					onClick={() => handleIngredientClick()}>
					Нажми на меня
				</Button>
			</div>
			<Modal
				isActive={isModalVisible}
				setActive={setModalActive}
				title={'Детали ингредиента'}>
				<OrderDetails />
			</Modal>
		</div>
	);
};

export default BurgerConstructor;
