import React, { FunctionComponent, useRef } from 'react';
import { Link, useLocation } from 'react-router-dom';
import s from './ingredients-list.module.less';
import IngredientCard from '../ingredient-card/ingredient-card';
import { IngredientModel } from '@models/ingredient-model.model';
import { useAppSelector } from '@models/hooks';
import { Categories, ingredientsItems, ITabsProps } from '@models/categories';
import { ingredientsCategories } from '@store/vars';
import { e as Location } from 'react-router/dist/development/route-data-CGHGzi13';

export const IngredientsList: FunctionComponent<ITabsProps> = ({
	currSection,
	updateCurrentSection,
}) => {
	const location: Location = useLocation();
	const items: ingredientsItems = useAppSelector(
		(state) => state.ingredients.items
	);
	const categories: Categories = ingredientsCategories;
	const categoriesName: string = (el: string) => categories[el];
	const sectionRef = useRef<HTMLDivElement>(null);
	const inputRefs: HTMLElement[] = [];
	const myRefs = (ref: HTMLElement) => {
		inputRefs.push(ref);
	};

	const scrollHandler: (e: React.UIEvent<HTMLInputElement>) => void = (e) => {
		const scrollOffset = e.currentTarget.scrollTop;
		const curEl = inputRefs?.find(
			(item: HTMLElement) => item?.['offsetTop'] > scrollOffset
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
						([key, ingredients]: [string, IngredientModel[]]) => (
							<section key={key} id={key} ref={myRefs}>
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
