import s from './home.module.less';
import BurgerIngredientsEl from '../burger-ingredients/burger-ingredients';
import BurgerConstructorEl from '../burger-constructor/burger-constructor';
import React from 'react';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';

export const HomePage = () => {
	return (
		<div className={s.wrapper}>
			<h2 className='text text_type_main-large pt-10 pb-5'>Соберите бургер</h2>
			<div className={s.content}>
				<DndProvider backend={HTML5Backend}>
					<section className={s.side}>
						<BurgerIngredientsEl />
					</section>
					<section className={s.side}>
						<BurgerConstructorEl />
					</section>
				</DndProvider>
			</div>
		</div>
	);
};
