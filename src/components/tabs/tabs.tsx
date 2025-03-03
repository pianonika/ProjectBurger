import React from 'react';
import s from './tabs.module.less';
import { Tab } from '@ya.praktikum/react-developer-burger-ui-components';
import IngredientsList from '../ingredients-list/ingredients-list';

export const Tabs = ({}) => {
	const [current, setCurrent] = React.useState('one');
	return (
		<section className={s.tabs}>
			<div style={{ display: 'flex' }}>
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
			<div className={s.content}>
				<IngredientsList />
			</div>
		</section>
	);
};

export default Tabs;
