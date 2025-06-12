import React from 'react';
import s from '@pages/ingredient-details-page/ingredient-details-page.module.less';
import OrderDetails from '@components/order-details/order-details';

export function OrderPage() {
	return (
		<div className={s.modal_content}>
			<div className='modal_body'>
				<OrderDetails />
			</div>
		</div>
	);
}
