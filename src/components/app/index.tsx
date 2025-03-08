import s from './app.module.less';
import AppHeaderEl from '../app-header/app-header';
import BurgerIngredientsEl from '../burger-ingredients/burger-ingredients';
import BurgerConstructorEl from '../burger-constructor/burger-constructor';
import React from 'react';

export const App = () => {
	return (
		<div className={s.page}>
			<div className='header'>
				<AppHeaderEl />
			</div>
			<main className={s.main}>
				<h2 className='text text_type_main-large pt-10 pb-5'>
					Соберите бургер
				</h2>
				<div className={s.content}>
					<section className={s.side}>
						<BurgerIngredientsEl />
					</section>
					<section className={s.side}>
						<BurgerConstructorEl />
					</section>
				</div>
			</main>
		</div>
	);
};
