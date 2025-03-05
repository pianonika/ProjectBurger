import React, { FC, useState } from 'react';
import s from './burger-constructor.module.less';
import {
	Button,
	ConstructorElement,
	CurrencyIcon,
	DragIcon,
} from '@ya.praktikum/react-developer-burger-ui-components';
import Modal from '../modal/modal';
import OrderDetails from '../order-details/order-details';
import {
	IngredientModel,
	IngredientModelData,
} from '../../models/ingredient-model.model';
import IngredientCard from '../ingredient-card/ingredient-card';
import { FILLINGS } from '@utils/fillings';

export const BurgerConstructor: FC<IngredientModelData> = ({ data }) => {
	const [isModalVisible, setModalActive] = useState(false);
	const [detailsData, setDetailsData] = useState<string>('000000');
	const [chosenIngredients, setchosenIngredients] = useState({
		bun: {
			_id: '643d69a5c3f7b9001cfa093c',
			name: 'Краторная булка N-200i',
			type: 'bun',
			proteins: 80,
			fat: 24,
			carbohydrates: 53,
			calories: 420,
			price: 1255,
			image: 'https://code.s3.yandex.net/react/code/bun-02.png',
			image_mobile: 'https://code.s3.yandex.net/react/code/bun-02-mobile.png',
			image_large: 'https://code.s3.yandex.net/react/code/bun-02-large.png',
			__v: 0,
		},
		filling: FILLINGS,
	});

	const handleIngredientClick = () => {
		setDetailsData(String(Math.ceil(Math.random() * 1000000)));
		setModalActive(true);
	};

	return (
		<div className={s.burgerConstructor}>
			<div className={s.chosenIngredients}>
				<div className={s.constructorItem}>
					<ConstructorElement
						type='top'
						isLocked={true}
						text={chosenIngredients.bun.name}
						price={chosenIngredients.bun.price}
						thumbnail={chosenIngredients.bun.image}
					/>
				</div>
				<div className={`${s.fillings} pr-4`}>
					{chosenIngredients.filling.map(
						(ingredient: IngredientModel, key: number) => (
							<div
								className={`${s.constructorItem} ${s.constructorItem__draggable}`}
								key={`${ingredient._id}+${key}`}>
								<div className={s.constructorItemIcon}>
									<DragIcon type='primary' />
								</div>
								<ConstructorElement
									text={ingredient.name}
									price={ingredient.price}
									thumbnail={ingredient.image}
								/>
							</div>
						)
					)}
				</div>

				<div className={s.constructorItem}>
					<ConstructorElement
						type='bottom'
						isLocked={true}
						text={chosenIngredients.bun.name}
						price={chosenIngredients.bun.price}
						thumbnail={chosenIngredients.bun.image}
					/>
				</div>
			</div>

			<div className={`${s.total} pt-10`}>
				<div className={`${s.cost} mr-10`}>
					<p className='text text_type_digits-medium mr-2'>610</p>
					<CurrencyIcon type='primary' />
				</div>
				<Button
					htmlType='button'
					type='primary'
					size='large'
					onClick={() => handleIngredientClick()}>
					Нажми на меня
				</Button>
			</div>
			<Modal
				isActive={isModalVisible}
				setActive={setModalActive}
				title={'Детали ингредиента'}>
				{detailsData && <OrderDetails detailsData={detailsData} />}
			</Modal>
		</div>
	);
};

export default BurgerConstructor;
