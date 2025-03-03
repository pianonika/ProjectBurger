import React from 'react';
import s from './burger-ingredients.module.less';
import Tabs from '../tabs/tabs';
import {Button, CurrencyIcon} from '@ya.praktikum/react-developer-burger-ui-components';

export const BurgerIngredients = ({}) => {
	return (
		<div className={s.ingredients}>
			<Tabs />
		</div>
	);
};

export default BurgerIngredients;
