import React, { FC, useEffect, useState } from 'react';
import s from './ingredients-list.module.less';
import Modal from '../modal/modal';
import IngredientCard from '../ingredient-card/ingredient-card';
import IngredientDetails from '../ingredient-details/ingredient-details';
import { IngredientModel } from '../../models/ingredient-model.model';
import { useDispatch } from 'react-redux';
import { SET_CURR_INGREDIENT, REMOVE_CURR_INGREDIENT } from '../../services/chosen-ingredient/action.js';

export const IngredientsList: FC<IngredientModel[]> = (data) => {
	const dispatch = useDispatch();
	const ingredientArray: IngredientModel[] = Object.values(data);
	const [isModalVisible, setModalActive] = useState(false);
	// const [modalIngredient, setModalIngredient] = useState<IngredientModel>();
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

	return (
		<>
			<div className={s.group}>
				<h3 className='text text_type_main-medium mb-6'>Булки</h3>
				<ul className={`${s.cardsList} pl-4 pr-4`}>
					{ingredientArray.map((ingredient: IngredientModel, key: number) => (
						<li
							role='presentation'
							className={s.ingredientCardWrapper}
							onClick={() => handleIngredientClick(ingredient)}
							key={ingredient._id}>
							<IngredientCard
								ingredient={ingredient}
								key={`${ingredient._id} + ${key}`}
							/>
						</li>
					))}
				</ul>
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
