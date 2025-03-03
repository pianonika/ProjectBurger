import React from 'react';
import s from './burger-constructor.module.less';
import {
	Button,
	ConstructorElement,
	CurrencyIcon,
	DragIcon,
} from '@ya.praktikum/react-developer-burger-ui-components';

export const BurgerConstructor = ({}) => {
	return (
		<section className={s.rightSide}>
			<div className={s.choosenIngediens}>
				<div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
					<div className={s.constructorItem}>
						<ConstructorElement
							type='top'
							isLocked={true}
							text='Краторная булка N-200i (верх)'
							price={200}
							thumbnail={'https://code.s3.yandex.net/react/code/bun-02.png'}
						/>
					</div>
					<div className={`${s.constructorItem} ${s.constructorItem__draggable}`}>
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
							text='Краторная булка N-200i (низ)'
							price={200}
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
				<Button htmlType='button' type='primary' size='large'>
					Нажми на меня
				</Button>
			</div>
		</section>
	);
};

export default BurgerConstructor;
