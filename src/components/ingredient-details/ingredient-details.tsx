import React from 'react';
import s from './ingredient-details.module.less';
import { useAppSelector } from '../../models/hooks';

export const IngredientDetails = () => {
	const ingredient = useAppSelector((store) => store.currIngredient.ingredient);

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
