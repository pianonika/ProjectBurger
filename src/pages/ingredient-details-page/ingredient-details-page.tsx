import React from 'react';
import IngredientDetailsComponent from '@components/ingredient-details/ingredient-details';
import s from './ingredient-details-page.module.less';

export function IngredientDetailsPage() {
	return (
		<div className={s.modal_content}>
			<div className='modal_header'>
				<div className='text text_type_main-large mb-10'>
					Детали ингредиента
				</div>
			</div>
			<div className='modal_body'>
				<IngredientDetailsComponent />
			</div>
		</div>
	);
}
