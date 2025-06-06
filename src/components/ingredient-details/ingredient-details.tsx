import React, { useEffect } from 'react';
import s from './ingredient-details.module.less';
import { useAppDispatch, useAppSelector } from '@models/hooks';
import { REMOVE_CURR_INGREDIENT } from '@store/chosen-ingredient/action';
import { useParams } from 'react-router-dom';
import { IngredientModel } from '@models/ingredient-model.model';

export const IngredientDetails = () => {
	const dispatch = useAppDispatch();
	const { id } = useParams<'id'>();
	const chosenIngredient = useAppSelector(
		(store) => store.chosenIngredient.ingredient
	);
	const items: IngredientModel[] = useAppSelector(
		(state) => state.ingredients.defaultList
	);
	// @ts-ignore
	const ingredient: IngredientModel = chosenIngredient ?? items?.[id];
	const removeCurrIngredient: () => void = () => {
		dispatch({
			type: REMOVE_CURR_INGREDIENT,
		});
	};

	useEffect(() => {
		return removeCurrIngredient();
	}, []);

	return (
		<>
			{ingredient && (
				<div className='ingredient__details'>
					<img src={ingredient.image_large} alt='ingredient.name' />
					<title className='text text_type_main-medium'>
						{ingredient.name}
					</title>
					<table className={s.details_table}>
						<tbody>
							<tr>
								<td>
									<span className='text text_type_main-small'>
										Калории,ккал
									</span>
								</td>
								<td>
									<span className='text text_type_main-small'>Белки,г</span>
								</td>
								<td>
									<span className='text text_type_main-small'>Жиры,г</span>
								</td>
								<td>
									<span className='text text_type_main-small'>Углеводы,г</span>
								</td>
							</tr>
							<tr>
								<td>
									<span className='text text_type_digits-default'>
										{ingredient.calories}
									</span>
								</td>
								<td>
									<span className='text text_type_digits-default'>
										{ingredient.proteins}
									</span>
								</td>
								<td>
									<span className='text text_type_digits-default'>
										{ingredient.fat}
									</span>
								</td>
								<td>
									<span className='text text_type_digits-default'>
										{ingredient.carbohydrates}
									</span>
								</td>
							</tr>
						</tbody>
					</table>
				</div>
			)}
		</>
	);
};

export default IngredientDetails;
