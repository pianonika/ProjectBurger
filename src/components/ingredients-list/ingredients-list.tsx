import React, { useEffect, useRef } from 'react';
import { Link, useLocation } from 'react-router-dom';
import s from './ingredients-list.module.less';
import IngredientCard from '../ingredient-card/ingredient-card';
import { IngredientModel } from '@models/ingredient-model.model';
import { ingredientsCategories } from '@store/vars';
import { useAppDispatch, useAppSelector } from '@models/hooks';
import {
	getIngredients,
	INCREMENT_INGREDIENTS_COUNT,
} from '@store/ingredients/action';
import { ingredientsItems } from '@models/categories';
import { ADD_FILLINGS_ITEM, SET_BUN } from '@store/cart/action';
import uuid from 'react-uuid';

export const IngredientsList = ({
	currSection,
	updateCurrentSection,
}: {
	currSection: string;
	updateCurrentSection: any;
}) => {
	const dispatch = useAppDispatch();
	const location = useLocation();
	// let state = modalLocation.state as { modalLocation: location };
	useEffect(() => {
		dispatch(getIngredients());
	}, []);

	const items: ingredientsItems = useAppSelector(
		(state) => state.ingredients.items
	);
	const categories = ingredientsCategories;
	const addCurrIngredientToCart = (ingredient: IngredientModel) => {
		dispatch({
			type: INCREMENT_INGREDIENTS_COUNT,
			payload: ingredient,
		});
		ingredient = {
			...ingredient,
			uuid: uuid(),
		};
		if (ingredient.type === 'bun') {
			dispatch({
				type: SET_BUN,
				payload: ingredient,
			});
		} else {
			dispatch({
				type: ADD_FILLINGS_ITEM,
				payload: ingredient,
			});
		}
	};
	const modalIngredient = useAppSelector(
		(store) => store.chosenIngredient.ingredient
	);
	const categoriesName = (el: string) => categories[el];

	const sectionRef = useRef(null);
	const myRefs = useRef([]);

	const scrollHandler = (e: any) => {
		const scrollOffset = e.target.scrollTop;
		const curEl = myRefs.current.find(
			(item) => item?.['offsetTop'] > scrollOffset
		);
		curEl?.['id'] &&
			curEl?.['id'] !== currSection &&
			updateCurrentSection(curEl?.['id']);
	};

	return (
		<div
			className={`${s.content} custom-scroll mt-10`}
			onScroll={scrollHandler}>
			<div className={s.group} ref={sectionRef}>
				{items &&
					Object.entries(items).map(
						// 	// @ts-ignore
						([key, ingredients]: [string, IngredientModel[]], i: number) => (
							<section
								key={key}
								id={key}
								// @ts-ignore
								ref={(el) => (myRefs.current[i] = el)}>
								<h3 className='text text_type_main-medium mb-6'>
									{categoriesName(key)}
								</h3>
								<ul className={`${s.cardsList} pl-4 pr-4`}>
									{ingredients.length &&
										ingredients?.map((ingredient, ingredientIndex) => (
											<Link
												key={`${ingredient._id}`}
												to={`/ingredients/${ingredient._id}`}
												state={{ modalLocation: location }}
												className={s.cardLink}>
												<IngredientCard
													ingredient={ingredient}
													key={`${ingredient._id} + ${ingredientIndex}`}
												/>
											</Link>
										))}
								</ul>
							</section>
						)
					)}
			</div>
		</div>
	);
};

export default IngredientsList;
