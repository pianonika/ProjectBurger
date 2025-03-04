import React, { FC } from 'react';
import s from './burger-ingredients.module.less';
import Tabs from '../tabs/tabs';
import { IngredientModelData } from '../../models/ingredient-model.model';

export const BurgerIngredients: FC<IngredientModelData> = ({ data }) => {
	return (
		<div className={s.ingredients}>
			<Tabs {...data} />
		</div>
	);
};

export default BurgerIngredients;
