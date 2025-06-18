import React, { FC } from 'react';
import s from './ingredient-card.module.less';
import {
	Counter,
	CurrencyIcon,
} from '@ya.praktikum/react-developer-burger-ui-components';
import { IngredientModel } from '@models/ingredient-model.model';
import { useDrag } from 'react-dnd';
import { SET_CURR_INGREDIENT } from '@store/chosen-ingredient/action';
import { useAppDispatch } from '@models/hooks';

export const IngredientCard: FC<{
	ingredient: IngredientModel;
}> = ({ ingredient }) => {
	const dispatch = useAppDispatch();
	const [{ isDrag }, dragRef] = useDrag({
		type: 'ingredientCard',
		item: ingredient,
		collect: (monitor) => ({
			isDrag: monitor.isDragging(),
		}),
	});
	const handleIngredientClick: () => void = () => {
		setCurrIngredient(ingredient);
	};
	const setCurrIngredient: (ingredient: IngredientModel) => void = (
		ingredient
	) => {
		dispatch({
			type: SET_CURR_INGREDIENT,
			payload: ingredient,
		});
	};

	return (
		!isDrag && (
			<li
				role='presentation'
				className={s.ingredientCardWrapper}
				ref={dragRef}
				onClick={() => handleIngredientClick()}
				data-testId='ingredient-card'>
				<div className={s.card}>
					<div className={s.counter}>
						{ingredient.count && (
							<Counter count={ingredient.count} size='small' />
						)}
					</div>
					<img
						className={s.picture}
						src={ingredient.image}
						alt={ingredient.name}
					/>
					<div className={s.description}>
						<div className={`${s.cost}  mb-2`}>
							<p className='text text_type_digits-default mr-2'>
								{ingredient.price}
							</p>
							<CurrencyIcon type='primary' />
						</div>
						<div className={s.title}>{ingredient.name}</div>
					</div>
				</div>
			</li>
		)
	);
};

export default IngredientCard;
