import React from 'react';
import s from './ingredients-list.module.less';
import { INGREDIENTS } from '@utils/data';
import IngredientCard from '../ingredient-card/ingredient-card';

export const IngredientsList = ({}) => {
	const state: {
		_id: string;
		name: string;
		type: string;
		proteins: number;
		fat: number;
		carbohydrates: number;
		calories: number;
		price: number;
		image: string;
		image_mobile: string;
		image_large: string;
		__v: number;
	}[] = INGREDIENTS;
	return (
		<>
			<div className={s.group}>
				<h3 className='text text_type_main-medium mt-10 mb-6'>Булки</h3>
				<div className={s.cardsList}>
					{state.map((ingredient, i) => (
						<IngredientCard ingredient={ingredient} key={i} />
					))}
				</div>
			</div>
		</>
	);
};

export default IngredientsList;
