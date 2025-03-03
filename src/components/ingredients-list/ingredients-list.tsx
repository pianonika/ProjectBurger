import React, { useState } from 'react';
import s from './ingredients-list.module.less';
import { INGREDIENTS } from '@utils/data';
import IngredientCard from '../ingredient-card/ingredient-card';
import Modal from '../modal/modal';
import IngredientDetails from '../ingredient-details/ingredient-details';

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

	const [isModalVisible, setModalActive] = useState(true);
	return (
		<>
			<div className={s.group}>
				<h3 className='text text_type_main-medium mt-10 mb-6'>Булки</h3>
				<div className={s.cardsList}>
					{state.map((ingredient, i) => (
						<div onClick={() => setModalActive(true)}>
							<IngredientCard ingredient={ingredient} key={i} />
						</div>
					))}
				</div>
			</div>
			<Modal
				isActive={isModalVisible}
				setActive={setModalActive}
				title={'Детали ингредиента'}>
				<IngredientDetails />
			</Modal>
		</>
	);
};

export default IngredientsList;
