import React, { FC } from 'react';
import s from './tabs.module.less';
import { Tab } from '@ya.praktikum/react-developer-burger-ui-components';
import IngredientsList from '../ingredients-list/ingredients-list';
import { IngredientModel } from '../../models/ingredient-model.model';

export const Tabs: FC<IngredientModel[]> = (data) => {
	const [current, setCurrent] = React.useState('one');
	return (
		<section className={s.tabs}>
			<div className={s.tabs__inner}>
				<Tab value='one' active={current === 'one'} onClick={setCurrent}>
					Булки
				</Tab>
				<Tab value='two' active={current === 'two'} onClick={setCurrent}>
					Соусы
				</Tab>
				<Tab value='three' active={current === 'three'} onClick={setCurrent}>
					Начинки
				</Tab>
			</div>
			<div className={`${s.content} custom-scroll mt-10`}>
				<IngredientsList {...data} />
			</div>
		</section>
	);
};

export default Tabs;
