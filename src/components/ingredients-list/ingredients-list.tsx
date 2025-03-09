import React, { useEffect, useRef, useState } from 'react';
import s from './ingredients-list.module.less';
import Modal from '../modal/modal';
import IngredientCard from '../ingredient-card/ingredient-card';
import IngredientDetails from '../ingredient-details/ingredient-details';
import { IngredientModel } from '../../models/ingredient-model.model';
import {
	REMOVE_CURR_INGREDIENT,
	SET_CURR_INGREDIENT,
} from '../../services/chosen-ingredient/action.js';
import { ingredientsCategories } from '../../services/vars';
import { useAppDispatch, useAppSelector } from '../../models/hooks';
import {
	getIngredients,
	INCREMENT_INGREDIENTS_COUNT,
} from '../../services/ingredients/action';
import { ingredientsItems } from '../../models/categories';
import { ADD_FILLINGS_ITEM, SET_BUN } from '../../services/cart/action';
import uuid from 'react-uuid';

export const IngredientsList = ({
	currSection,
	updateCurrentSection,
}: {
	currSection: string;
	updateCurrentSection: any;
}) => {
	const dispatch = useAppDispatch();
	useEffect(() => {
		dispatch(getIngredients());
	}, []);

	const items: ingredientsItems = useAppSelector(
		(state) => state.ingredients.items
	);
	const categories = ingredientsCategories;
	const [isModalVisible, setModalActive] = useState(false);
	const handleIngredientClick = (ingredient: IngredientModel) => {
		// setModalActive(true);
		// setCurrIngredient(ingredient);

		addCurrIngredientToCart(ingredient);
	};
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

	useEffect(() => {
		if (!isModalVisible) {
			removeCurrIngredient();
		}
	}, [isModalVisible]);

	const setCurrIngredient = (ingredient: IngredientModel) => {
		dispatch({
			type: SET_CURR_INGREDIENT,
			payload: ingredient,
		});
	};

	const removeCurrIngredient = () => {
		dispatch({
			type: REMOVE_CURR_INGREDIENT,
		});
	};
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
											<IngredientCard
												ingredient={ingredient}
												key={`${ingredient._id} + ${ingredientIndex}`}
												onClick={() => handleIngredientClick(ingredient)}
											/>
										))}
								</ul>
							</section>
						)
					)}
			</div>
			{isModalVisible && (
				<Modal
					isActive={isModalVisible}
					setActive={setModalActive}
					title={'Детали ингредиента'}>
					<IngredientDetails />
				</Modal>
			)}
		</div>
	);
};

export default IngredientsList;
