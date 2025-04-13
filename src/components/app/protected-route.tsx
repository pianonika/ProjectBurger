import { Navigate, useLocation } from 'react-router-dom';
import { useAppSelector } from '@models/hooks';

export interface LocationState {
	from: {
		pathname: string;
	};
	state: any;
}
const Protected = ({
	onlyUnAuth = false,
	component,
}: {
	onlyUnAuth?: boolean;
	component: JSX.Element;
}) => {
	// isAuthChecked это флаг, показывающий что проверка токена произведена
	// при этом результат этой проверки не имеет значения, важно только,
	// что сам факт проверки имел место.
	const isAuthChecked = useAppSelector(
		(store) => store.authorization.isAuthChecked
	);
	const user = useAppSelector((store) => store.authorization.user);
	const location = useLocation();

	if (!isAuthChecked) {
		// Запрос еще выполняется
		// Выводим прелоадер в ПР
		// Здесь возвращается просто null для экономии времени
		return null;
	}

	if (onlyUnAuth && user) {
		// Пользователь авторизован, но роут предназначен для неавторизованного пользователя
		// Делаем редирект на главную страницу или на тот адрес, что записан в location.state.from
		const { from } = (location.state as LocationState)?.state || {
			from: { pathname: '/' },
		};
		return <Navigate to={from} />;
	}

	if (!onlyUnAuth && !user) {
		return <Navigate to='/login' state={{ from: location }} />;
	}

	// !onlyUnAuth && user Пользователь авторизован и роут для авторизованного пользователя

	return component;
};

export const OnlyAuth = Protected;
export const OnlyUnAuth = ({ component }: { component: JSX.Element }) => (
	<Protected onlyUnAuth={true} component={component} />
);
// : ({
// 	   component: FunctionComponent,
//    }) => FunctionComponent
