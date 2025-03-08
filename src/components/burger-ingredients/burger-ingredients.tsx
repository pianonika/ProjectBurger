import React, { useEffect, useRef } from 'react';
import s from './burger-ingredients.module.less';
import Tabs from '../tabs/tabs';
import IngredientsList from '../ingredients-list/ingredients-list';
import { useAppDispatch, useAppSelector } from '../../models/hooks';
import { getIngredients } from '../../services/ingredients/action';

export const BurgerIngredients = () => {
	const dispatch = useAppDispatch();
	const { items, itemsRequest, itemsFailed } = useAppSelector(
		(state) => state.ingredients
	);

	useEffect(() => {
		dispatch(getIngredients());
	}, []);
	return (
		<div className={s.ingredients}>
			<div className='tabs'>
				<Tabs />
			</div>
			<div className={`${s.content} custom-scroll mt-10`}>
				<IngredientsList {...items} />
			</div>
		</div>
	);
};

export default BurgerIngredients;
