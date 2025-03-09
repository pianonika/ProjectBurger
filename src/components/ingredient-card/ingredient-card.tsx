import React, { FC } from 'react';
import s from './ingredient-card.module.less';
import {
	Counter,
	CurrencyIcon,
} from '@ya.praktikum/react-developer-burger-ui-components';
import { IngredientModel } from '../../models/ingredient-model.model';

export const IngredientCard: FC<{ ingredient: IngredientModel }> = ({
	ingredient,
}) => {
	return (
		<div className={s.card}>
			<div className={s.counter}>
				<Counter count={ingredient.count} size='small' />
			</div>
			<img className={s.picture} src={ingredient.image} alt={ingredient.name} />
			<div className={s.description}>
				<div className={`${s.cost}  mb-2`}>
					<p className='text text_type_digits-default mr-2'>{ingredient.price}</p>
					<CurrencyIcon type='primary' />
				</div>
				<div className={s.title}>{ingredient.name}</div>
			</div>
		</div>
	);
};

export default IngredientCard;
