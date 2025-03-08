import React, { useState } from 'react';
import s from './burger-ingredients.module.less';
import Tabs from '../tabs/tabs';
import IngredientsList from '../ingredients-list/ingredients-list';

export const BurgerIngredients = () => {
	const [currSection, setCurrentSection] = useState('bun');

	// @ts-ignore
	return (
		<div className={s.ingredients}>
			<div className='tabs'>
				<Tabs
					currSection={currSection}
					updateCurrentSection={setCurrentSection}
				/>
			</div>

			<IngredientsList
				updateCurrentSection={setCurrentSection}/>
		</div>
	);
};

export default BurgerIngredients;
