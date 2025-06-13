import { ConstructorElement } from '@ya.praktikum/react-developer-burger-ui-components';
import s from '../burger-constructor.module.less';
import { IngredientModelUnic } from '@models/ingredient-model.model';
import { DECREMENT_INGREDIENTS_COUNT } from '@store/ingredients/action';
import { useAppDispatch, useAppSelector } from '@models/hooks';
import { useDrag, useDrop } from 'react-dnd';
import React, { FC, useRef } from 'react';
import { XYCoord } from 'react-dnd/src/types/monitors';
import type { DropTargetMonitor } from 'react-dnd/src/types';
import { getFillings } from '@store/cart/reducer';
import { CHANGE_ITEMS_ORDER, REMOVE_FILLINGS_ITEM } from '@store/cart/action';

type DragObject = {
	id: string;
	index: number;
};
type DragCollectedProps = { isDragging: boolean };
type BurgerConstructorItem = {
	index: number;
	id: string;
	text: string;
	price: number;
	thumbnail: string;
	ingredient: IngredientModelUnic;
	key: string;
};

export const BurgerConstructorItem: FC<BurgerConstructorItem> = ({
	index,
	id,
	text,
	price,
	thumbnail,
	ingredient,
}) => {
	const dispatch = useAppDispatch();
	const fillings = useAppSelector(getFillings);
	const deleteIngredient = (deleteIngredient: IngredientModelUnic) => {
		dispatch({
			type: REMOVE_FILLINGS_ITEM,
			payload: deleteIngredient.uniqueId ?? '',
		});
		dispatch({
			type: DECREMENT_INGREDIENTS_COUNT,
			payload: deleteIngredient,
		});
	};
	//DND

	const ref = useRef<HTMLInputElement | null>(null);
	const [, drop] = useDrop<DragObject, HTMLElement, unknown>({
		accept: 'constructorItem',
		hover: (
			item: DragObject,
			monitor: DropTargetMonitor<DragObject, HTMLElement>
		) => {
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
	const [{ isDragging }, drag] = useDrag<
		DragObject,
		unknown,
		DragCollectedProps
	>({
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
