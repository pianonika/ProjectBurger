import s from './app.module.less';
import AppHeaderEl from '../app-header/app-header';
import BurgerIngredientsEl from '../burger-ingredients/burger-ingredients';
import BurgerConstructorEl from '../burger-constructor/burger-constructor';
import React, { useEffect, useState } from 'react';
import { IngredientModel } from '../../models/ingredient-model.model';

export const App = () => {
	const [isLoading, setIsLoading] = useState(true);
	const [productData, setProductData] = useState<IngredientModel[]>([]);
	const BASE_URL = 'https://norma.nomoreparties.space';

	useEffect(() => {
		const getProductData = async () => {
			setIsLoading(true);

			try {
				const res = await fetch(`${BASE_URL}/api/ingredients`);
				const data = (await res.json()) as {
					status: string;
					data: IngredientModel[];
				};
				setProductData(data.data);
			} catch (e) {
				console.error(e);
			} finally {
				setIsLoading(false);
			}
		};

		getProductData();
	}, []);

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
					{isLoading && <div>Loading...</div>}
					{!isLoading && (
						<>
							<section className={s.side}>
								<BurgerIngredientsEl data={productData} />
							</section>
							<section className={s.side}>
								<BurgerConstructorEl data={productData} />
							</section>
						</>
					)}
				</div>
			</main>
		</div>
	);
};
