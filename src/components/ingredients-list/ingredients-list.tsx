import React, { FC, useState } from 'react';
import s from './ingredients-list.module.less';
import Modal from '../modal/modal';
import IngredientCard from '../ingredient-card/ingredient-card';
import IngredientDetails from '../ingredient-details/ingredient-details';
import { IngredientModel } from '../../models/ingredient-model.model';

export const IngredientsList: FC<IngredientModel[]> = (data) => {
	const ingredientArray: IngredientModel[] = Object.values(data);
	const [isModalVisible, setModalActive] = useState(false);
	const [modalIngredient, setModalIngredient] = useState<IngredientModel>();
	const handleIngredientClick = (ingredient: IngredientModel) => {
		setModalIngredient(ingredient);
		setModalActive(true);
	};

	return (
		<>
			<div className={s.group}>
				<h3 className='text text_type_main-medium mt-10 mb-6'>Булки</h3>
				<div className={s.cardsList}>
					{ingredientArray.map((ingredient: IngredientModel, key: number) => (
						<div
							className='IngredientCardWrapper'
							onClick={() => handleIngredientClick(ingredient)}
							key={ingredient._id}>
							<IngredientCard
								ingredient={ingredient}
								key={`${ingredient._id} + ${key}`}
							/>
						</div>
					))}
				</div>
			</div>
			<Modal
				isActive={isModalVisible}
				setActive={setModalActive}
				title={'Детали ингредиента'}>
				{modalIngredient && <IngredientDetails ingredient={modalIngredient} />}
			</Modal>
		</>
	);
};

export default IngredientsList;
