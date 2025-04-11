import React, { FC } from 'react';
import s from './ingredient-card.module.less';
import {
	Counter,
	CurrencyIcon,
} from '@ya.praktikum/react-developer-burger-ui-components';
import { IngredientModel } from '../../models/ingredient-model.model';

	return (
		<div className={s.card}>
			<div className={s.counter}>
			</div>
			<div className={s.description}>
				<div className={`${s.cost}  mb-2`}>
					<CurrencyIcon type='primary' />
				</div>
				<div className={s.title}>{ingredient.name}</div>
			</div>
		</div>
	);
};

export default IngredientCard;
