import React, { FC, SyntheticEvent, useEffect } from 'react';
import { createPortal } from 'react-dom';
import s from './modal.module.less';
import { CloseIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import ModalOverlayEl from '../modal-overlay/modal-overlay';

const modalRoot = document.getElementById('react-modals') as HTMLElement;
type TProps = {
	isActive?: boolean;
	closeModal: () => void;
	children: React.ReactNode;
	title?: string;
};

export const Modal: FC<TProps> = ({
	isActive,
	closeModal,
	children,
	title,
}) => {
	useEffect(() => {
		const handleKeydown = (event: KeyboardEvent) => {
			if (event.key === 'Escape') {
				closeModal();
			}
		};
		window.addEventListener('keydown', handleKeydown);

		return () => {
			window.removeEventListener('keydown', handleKeydown);
		};
	}, []);

	return createPortal(
		<div
			role='presentation'
			className={isActive ? `${s.modal} ${s.active}` : `${s.modal}`}
			onClick={() => closeModal()}>
			<ModalOverlayEl />
			<div
				role='presentation'
				className={s.modal_content}
				onClick={(event: SyntheticEvent<HTMLDivElement>) =>
					event.stopPropagation()
				}>
				<div className='modal_header'>
					{title && (
						<div className='text text_type_main-large mb-10'>{title}</div>
					)}
					<div
						role='presentation'
						className={s.modal_close}
						onClick={() => closeModal()}>
						<CloseIcon type='primary' />
					</div>
				</div>
				<div className='modal_body'>{children}</div>
			</div>
		</div>,
		modalRoot
	);
};

export default Modal;
