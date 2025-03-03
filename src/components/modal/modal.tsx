import React from 'react';
import s from './modal.module.less';
import { CloseIcon } from '@ya.praktikum/react-developer-burger-ui-components';

// @ts-ignore
export const Modal = ({ isActive, setActive, children, title }) => {
	return (
		<div className={isActive ? `${s.modal} ${s.active}` : `${s.modal}`} onClick={() => setActive(false)}>
			<div className={s.modal_content}
				 onClick={(event) => event.stopPropagation()}>
				<div
					className={s.modal_close}  onClick={() => setActive(false)}>
					<CloseIcon type='primary'/>
				</div>
				<p className="text text_type_main-large mb-10">
					{title}
				</p>
				{children}
			</div>
		</div>
	);
};

export default Modal;
