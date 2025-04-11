import React, { useRef } from 'react';
import { Link, useLocation } from 'react-router-dom';
import s from './ingredients-list.module.less';
import IngredientCard from '../ingredient-card/ingredient-card';
import { IngredientModel } from '@models/ingredient-model.model';
import { ingredientsCategories } from '@store/vars';
import { useAppSelector } from '@models/hooks';
import { ingredientsItems } from '@models/categories';

export const IngredientsList = ({
	currSection,
	updateCurrentSection,
}: {
	currSection: string;
	updateCurrentSection: any;
}) => {
	const location = useLocation();

	const items: ingredientsItems = useAppSelector(
		(state) => state.ingredients.items
	);
	const categories = ingredientsCategories;
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
