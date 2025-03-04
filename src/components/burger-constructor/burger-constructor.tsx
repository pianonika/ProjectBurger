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
import {IngredientModel, IngredientModelData} from '../../models/ingredient-model.model';

export const BurgerConstructor: FC<IngredientModelData> = ({ data }) => {
	const availableIngredients: IngredientModel[] = data;
	const [isModalVisible, setModalActive] = useState(false);
	const [detailsData, setDetailsData] = useState<string>('000000');
	const [chosenIngrediensIds, setChosenIngrediensIds] = useState({
		bread: '643d69a5c3f7b9001cfa093c',
		filling: ['643d69a5c3f7b9001cfa093e', '643d69a5c3f7b9001cfa0940'],
	});
	// const [chosenBread, setChosenBread] = useState(
	// 	availableIngredients[chosenIngrediensIds.bread]
	// );

	const handleIngredientClick = () => {
		setDetailsData(String(Math.ceil(Math.random() * 1000000)));
		setModalActive(true);
	};

	return (
		<section className={s.rightSide}>
			<div className={s.choosenIngediens}>
				<div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
					<div className={s.constructorItem}>
						<ConstructorElement
							type='top'
							isLocked={true}
							text='Краторная булка N-200i (верх)'
							price={50}
							thumbnail={'https://code.s3.yandex.net/react/code/bun-02.png'}
						/>
					</div>

					<div
						className={`${s.constructorItem} ${s.constructorItem__draggable}`}>
						<div className={s.constructorItemIcon}>
							<DragIcon type='primary' />
						</div>
						<ConstructorElement
							text='Краторная булка N-200i (верх)'
							price={50}
							thumbnail={'https://code.s3.yandex.net/react/code/bun-02.png'}
						/>
					</div>
					<div className={s.constructorItem}>
						<ConstructorElement
							type='bottom'
							isLocked={true}
							text='Краторная булка N-200i (верх)'
							price={50}
							thumbnail={'https://code.s3.yandex.net/react/code/bun-02.png'}
						/>
					</div>
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
		</section>
	);
};

export default BurgerConstructor;
