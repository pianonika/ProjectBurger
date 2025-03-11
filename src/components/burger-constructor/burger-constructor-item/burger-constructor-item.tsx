import { ConstructorElement } from '@ya.praktikum/react-developer-burger-ui-components';
import s from '../burger-constructor.module.less';
import {IngredientModel, IngredientModelUnic} from '../../../models/ingredient-model.model';
import {
	CHANGE_ITEMS_ORDER,
	REMOVE_FILLINGS_ITEM,
} from '../../../services/cart/action';
import { DECREMENT_INGREDIENTS_COUNT } from '../../../services/ingredients/action';
import { useAppDispatch, useAppSelector } from '../../../models/hooks';
import { useDrag, useDrop } from 'react-dnd';
import React, { useRef } from 'react';
import { XYCoord } from 'react-dnd/src/types/monitors';

export const BurgerConstructorItem = ({
	index,
	id,
	text,
	price,
	thumbnail,
	ingredient,
}: {
	index: number;
	id: string;
	text: string;
	price: number;
	thumbnail: string;
	ingredient: IngredientModelUnic;
	key: string;
}) => {
	const dispatch = useAppDispatch();
	const fillings = useAppSelector((store) => store.cart.fillings);
	const deleteIngredient = (deleteIngredient: IngredientModelUnic) => {
		dispatch({
			type: REMOVE_FILLINGS_ITEM,
			payload: deleteIngredient.uniqueId,
		});
		dispatch({
			type: DECREMENT_INGREDIENTS_COUNT,
			payload: deleteIngredient,
		});
	};
	//DND

	// @ts-nocheck
	const ref = useRef<HTMLInputElement>(null);
	const [, drop] = useDrop({
		accept: 'constructorItem',
		hover: (item: { id: IngredientModel; index: number }, monitor) => {
			if (!ref.current) {
				return;
			}
			const dragIndex = item.index;
			const hoverIndex = index;

			if (dragIndex === hoverIndex) {
				return;
			}

			const hoverBoundingRect = ref?.current?.getBoundingClientRect();
			const hoverMiddleY =
				(hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;

			const clientOffset = monitor?.getClientOffset() as XYCoord;
			const hoverClientY = clientOffset.y - hoverBoundingRect.top;
			if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) {
				return;
			}
			if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) {
				return;
			}

			moveCard(dragIndex, hoverIndex);

			item.index = hoverIndex;
		},
	});
	const [{ isDragging }, drag] = useDrag({
		type: 'constructorItem',
		item: () => {
			return { id, index };
		},
		collect: (monitor) => ({
			isDragging: monitor.isDragging(),
		}),
	});

	drag(drop(ref));

	const moveCard = (dragIndex: number, hoverIndex: number) => {
		const newFillings = [...fillings];
		const movedItem = fillings[dragIndex];
		newFillings.splice(dragIndex, 1);
		newFillings.splice(hoverIndex, 0, movedItem);

		dispatch({
			type: CHANGE_ITEMS_ORDER,
			payload: newFillings,
		});
	};

	return (
		<div
			className={`${s.constructorItem} ${s.constructorItem__draggable} ${
				isDragging && s.isDragging
			}`}
			ref={ref}>
			<ConstructorElement
				text={text}
				price={price}
				thumbnail={thumbnail}
				handleClose={() => deleteIngredient(ingredient)}
			/>
		</div>
	);
};

export default BurgerConstructorItem;
