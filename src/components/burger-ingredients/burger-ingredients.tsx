import React, { useState } from 'react';
import s from './burger-ingredients.module.less';
import Tabs from '../tabs/tabs';
import IngredientsList from '../ingredients-list/ingredients-list';

export const BurgerIngredients = () => {
	const [currSection, setCurrentSection] = useState<string>('bun');
	return (
		<div className={s.ingredients}>
			<div className='tabs'>
				<Tabs
					currSection={currSection}
					updateCurrentSection={setCurrentSection}
				/>
			</div>

			<IngredientsList
				currSection={currSection}
				updateCurrentSection={setCurrentSection}
			/>
		</div>
	);
};

export default BurgerIngredients;
