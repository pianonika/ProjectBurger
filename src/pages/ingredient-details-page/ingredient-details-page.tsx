import React, { useEffect } from 'react';
import IngredientDetailsComponent from '@components/ingredient-details/ingredient-details';
import { getIngredients } from '@store/ingredients/action';
import { IngredientModel } from '@models/ingredient-model.model';
import { useAppDispatch, useAppSelector } from '@models/hooks';
import s from './ingredient-details-page.module.less';

export function IngredientDetailsPage() {
	const dispatch = useAppDispatch();
	const items: IngredientModel[] = useAppSelector(
		(state) => state.ingredients.defaultList
	);

	useEffect(() => {
		if (!items.length) {
			dispatch(getIngredients());
		}
	}, []);
	return (
		<div className={s.modal_content}>
			<div className='modal_header'>
				<div className='text text_type_main-large mb-10'>
					Детали ингредиента
				</div>
			</div>
			<div className='modal_body'>
				<IngredientDetailsComponent />
			</div>
		</div>
	);
}
