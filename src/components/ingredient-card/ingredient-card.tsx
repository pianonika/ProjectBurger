import React from 'react';
import s from './ingredient-card.module.less';
import {
	Counter,
	CurrencyIcon,
} from '@ya.praktikum/react-developer-burger-ui-components';

// @ts-ignore
export const IngredientCard = ({ ingredient }) => {
	return (
		<div className={s.card}>
			<div className={s.counter}>
				<Counter count={233} size='small' />
			</div>
			<img className={s.picture} src={ingredient.image} alt={ingredient.name} />
			<div className={s.description}>
				<div className={`${s.cost}  mb-2`}>
					<p className='text text_type_digits-default mr-2'>20</p>
					<CurrencyIcon type='primary' />
				</div>
				<div className={s.title}>{ingredient.name}</div>
			</div>
		</div>
	);
};

export default IngredientCard;
