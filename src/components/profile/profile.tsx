import React from 'react';
import ProfileMenu from '@components/profile/profile-menu/profile-menu';

export const Profile = ({
	children,
	title,
}: {
	children: React.ReactNode;
	title: string;
}) => {
	return (
		<div className='page_wrapper'>
			<h1 className='text text_type_main-medium page_header'>{title}</h1>
			<div className='page_content'>
				<div className='page_content__left'>
					<ProfileMenu />
				</div>
				<div className='page_content__center'>{children}</div>
				<div className='page_content__right'></div>
			</div>
		</div>
	);
};

export default Profile;
