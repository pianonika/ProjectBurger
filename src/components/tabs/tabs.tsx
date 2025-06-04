import React, { Dispatch, FC, SetStateAction } from 'react';
import s from './tabs.module.less';
import { Tab } from '@ya.praktikum/react-developer-burger-ui-components';
import { ingredientsCategories } from '@store/vars';
import { ITabsProps } from '@models/categories';

export const Tabs: FC<ITabsProps> = ({
	currSection,
	updateCurrentSection,
}: {
	currSection: string;
	updateCurrentSection: Dispatch<SetStateAction<string>>;
}) => {
	const setCurrentSection = (key: string) => {
		updateCurrentSection(key);
	};
	const tabs = ingredientsCategories;
	return (
		<section className={s.tabs}>
			<div className={s.tabs__inner}>
				{tabs &&
					Object.entries(tabs).map(
						([key, value]: [string, string], index: number) => (
							<Tab
								value={key}
								active={currSection === key}
								onClick={() => setCurrentSection(key)}
								key={`${key} + ${index}`}>
								{value}
							</Tab>
						)
					)}
			</div>
		</section>
	);
};

export default Tabs;
