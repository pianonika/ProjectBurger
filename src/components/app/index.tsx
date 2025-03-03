import s from './app.module.less';
import AppHeader from '../app-header/app-header';
import BurgerIngredients from '../burger-ingredients/burger-ingredients';
import BurgerConstructor from '../burger-constructor/burger-constructor';
import React from 'react';

export const App = () => {
	return (
		<div className={s.page}>
			<div className={s.header}>
				<AppHeader />
			</div>
			<main className={s.main}>
				<h2 className={`text text_type_main-large pt-10 pb-5 ${s.header}`}>
					Соберите бургер
				</h2>
				<div className={s.content}>
					<section className={s.ingredients}>
						<BurgerIngredients />
					</section>
					<section className={s.burgerConstructor}>
						<BurgerConstructor />
					</section>
				</div>
			</main>
		</div>
	);
};
