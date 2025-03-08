import React, { FC, useEffect, useState } from 'react';
import s from './ingredients-list.module.less';
import Modal from '../modal/modal';
import IngredientCard from '../ingredient-card/ingredient-card';
import IngredientDetails from '../ingredient-details/ingredient-details';
import { IngredientModel } from '../../models/ingredient-model.model';
import { useDispatch } from 'react-redux';
import {
	REMOVE_CURR_INGREDIENT,
	SET_CURR_INGREDIENT,
} from '../../services/chosen-ingredient/action.js';
import { ingredientsCategories } from '../../services/vars';

export const IngredientsList: FC<{ [key: string]: IngredientModel[] }> = (
	data
) => {
	const dispatch = useDispatch();
	const categories = ingredientsCategories;
	const [isModalVisible, setModalActive] = useState(false);
	const handleIngredientClick = (ingredient: IngredientModel) => {
		// setModalIngredient(ingredient);
		setModalActive(true);
		setCurrIngredient(ingredient);
	};

	useEffect(() => {
		if (!isModalVisible) {
			removeCurrIngredient();
		}
	}, [isModalVisible]);

	const setCurrIngredient = (ingredient: IngredientModel) => {
		dispatch({
			type: SET_CURR_INGREDIENT,
			payload: ingredient,
		});
	};

	const removeCurrIngredient = () => {
		dispatch({
			type: REMOVE_CURR_INGREDIENT,
		});
	};
	const categoriesName = (el: string) => categories[el];

	return (
		<>
			<div className={s.group}>
				{data &&
					Object.entries(data).map(
						([key, ingredient]: [string, IngredientModel[]]) => (
							<>
								<h3 className='text text_type_main-medium mb-6'>
									{categoriesName(key)}
								</h3>
								<ul className={`${s.cardsList} pl-4 pr-4`}>
									{ingredient &&
										ingredient.map((ingredient, ingredientIndex) => (
											<li
												role='presentation'
												className={s.ingredientCardWrapper}
												onClick={() => handleIngredientClick(ingredient)}
												key={`${ingredient._id} + ${ingredientIndex}`}>
												<IngredientCard
													ingredient={ingredient}
													key={`${ingredient._id} + ${ingredientIndex}`}
												/>
											</li>
										))}
								</ul>
							</>
						)
					)}
			</div>
			{isModalVisible && (
				<Modal
					isActive={isModalVisible}
					setActive={setModalActive}
					title={'Детали ингредиента'}>
					<IngredientDetails />
				</Modal>
			)}
		</>
	);
};

export default IngredientsList;
