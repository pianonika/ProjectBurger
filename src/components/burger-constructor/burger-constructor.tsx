import React, { useMemo, useState } from 'react';
import s from './burger-constructor.module.less';
import {
	Button,
	ConstructorElement,
	CurrencyIcon,
} from '@ya.praktikum/react-developer-burger-ui-components';
import Modal from '../modal/modal';
import OrderDetails from '../order-details/order-details';
import {
	IngredientModel,
	IngredientModelUnic,
} from '@models/ingredient-model.model';
import { useAppDispatch, useAppSelector } from '@models/hooks';
import { CartModel } from '@models/cart';
import { ADD_FILLINGS_ITEM, SET_BUN } from '@store/cart/action';
import { CLEAR_ORDER_INFO, sendOrder } from '@store/order/action';
import { INCREMENT_INGREDIENTS_COUNT } from '@store/ingredients/action';
import { useDrop } from 'react-dnd';
import uuid from 'react-uuid';
import BurgerConstructorItem from './burger-constructor-item/burger-constructor-item';
import { useNavigate } from 'react-router-dom';

export const BurgerConstructor = () => {
	const dispatch = useAppDispatch();
	const navigate = useNavigate();
	const isAuth = useAppSelector((store) => store.authorization.user);
	const order = useAppSelector((store) => store.order);
	const [isActiveModal, setIsActiveModal] = useState(false);
	const closeOrderDetails = () => {
		dispatch({
			type: CLEAR_ORDER_INFO,
		});
		setIsActiveModal(false);
	};

	const chosenIngredients = useAppSelector((store) => store.cart) as CartModel;

	const handleIngredientClick = () => {
		if (!isAuth) {
			return navigate('/login');
		}
		const isBun = chosenIngredients.bun._id;
		const isFillings = !!chosenIngredients.fillings.length;
		if (isBun && isFillings && isAuth) {
			const requestData = calcIngredientsRequestData();
			dispatch(sendOrder(requestData));
			setIsActiveModal(true);
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

	const calcIngredientsRequestData = () => {
		const bunId = chosenIngredients.bun._id;
		const fillingsIds: string[] = chosenIngredients.fillings.map((i) => i._id);

		fillingsIds.unshift(bunId);
		fillingsIds.push(bunId);
		return JSON.stringify({ ingredients: fillingsIds });
	};

	//DND
	const [{ isOver }, dropRef] = useDrop({
		accept: 'ingredientCard',
		drop(itemId: IngredientModel) {
			addCurrIngredientToCart(itemId);
		},
		collect: (monitor) => ({
			isOver: monitor.isOver(),
		}),
	});
	const addCurrIngredientToCart = (ingredient: IngredientModel) => {
		dispatch({
			type: INCREMENT_INGREDIENTS_COUNT,
			payload: ingredient,
		});
		const newIngredient = {
			...ingredient,
			uniqueId: uuid(),
		};
		if (ingredient.type === 'bun') {
			dispatch({
				type: SET_BUN,
				payload: newIngredient,
			});
		} else {
			dispatch({
				type: ADD_FILLINGS_ITEM,
				payload: newIngredient,
			});
		}
	};

	return (
		<div className={s.burgerConstructor} ref={dropRef}>
			<div
				className={`${s.chosenIngredients} + ${
					isOver && s.chosenIngredients__active
				}`}>
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
							(ingredient: IngredientModelUnic, index: number) => (
								<BurgerConstructorItem
									index={index}
									id={ingredient._id}
									text={ingredient.name}
									price={ingredient.price}
									thumbnail={ingredient.image}
									ingredient={ingredient}
									key={ingredient.uniqueId}></BurgerConstructorItem>
							)
						)
					) : (
						<div className={`${s.constructorItem}  ${s.emptyFillings}`}>
							<div className={`constructor-element ${s.emptyFillings__inner}`}>
								<span className='constructor-element__row'>
									Добавь ингредиенты{' '}
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
					Оформить заказ
				</Button>
				sss{order.requestInProgress}
			</div>
			{isActiveModal && (
				<Modal isActive={isActiveModal} closeModal={closeOrderDetails}>
					<OrderDetails />
				</Modal>
			)}
		</div>
	);
};

export default BurgerConstructor;
