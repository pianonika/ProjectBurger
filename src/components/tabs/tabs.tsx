import React, { FC } from 'react';
import s from './tabs.module.less';
import { Tab } from '@ya.praktikum/react-developer-burger-ui-components';
import { ingredientsCategories } from '../../services/vars';

export const Tabs = () => {
	const [current, setCurrent] = React.useState('bun');
	const tabs = ingredientsCategories;
	return (
		<section className={s.tabs}>
			<div className={s.tabs__inner}>
				{tabs &&
					Object.entries(tabs).map(
						([key, value]: [string, string], index: number) => (
							<Tab value={key} active={current === key} onClick={setCurrent}
								 key = {`${key} + ${index}`}>
								{value}
							</Tab>
						)
					)}
				{/*<Tab value='one' active={current === 'one'} onClick={setCurrent}>*/}
				{/*	Булки*/}
				{/*</Tab>*/}
				{/*<Tab value='two' active={current === 'two'} onClick={setCurrent}>*/}
				{/*	Соусы*/}
				{/*</Tab>*/}
				{/*<Tab value='three' active={current === 'three'} onClick={setCurrent}>*/}
				{/*	Начинки*/}
				{/*</Tab>*/}
			</div>
		</section>
	);
};

export default Tabs;
