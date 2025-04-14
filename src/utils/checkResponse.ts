import { BASE_URL } from '@store/vars';

export const checkResponse = (res: Response) => {
	if (res.ok) {
		return res.json();
	}
	return Promise.reject(`Ошибка ${res.status}`);
};

export const checkSuccess = (res: any & { success: boolean }) => {
	if (res && res.success) {
		return res;
	}
	return Promise.reject(`Ответ не success: ${res}`);
};

export const request = (
	endpoint: string | URL | Request,
	options: RequestInit
) => {
	return fetch(`${BASE_URL}${endpoint}`, options)
		.then(checkResponse)
		.then(checkSuccess);
};

const checkReponse = (res: Response) => {
	return res.ok
		? res.json()
		: res.json().then((err: any & { message: string }) => Promise.reject(err));
};

export const refreshToken = () => {
	return (
		fetch(`${BASE_URL}/auth/token`, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json;charset=utf-8',
			},
			body: JSON.stringify({
				token: localStorage.getItem('refreshToken'),
			}),
		})
			.then(checkReponse)
			// !! Важно для обновления токена в мидлваре, чтобы запись токенов
			// была тут, а не в fetchWithRefresh
			.then((refreshData) => {
				if (!refreshData.success) {
					return Promise.reject(refreshData);
				}
				localStorage.setItem('refreshToken', refreshData.refreshToken);
				localStorage.setItem('accessToken', refreshData.accessToken);
				return refreshData;
			})
	);
};

export const fetchWithRefresh: (
	url: string,
	options: RequestInit & { headers?: { authorization?: string } }
) => Promise<Response> = async (url, options) => {
	const accessToken = localStorage.getItem('accessToken');
	if (options && options.headers) {
		options.headers.authorization = `${accessToken}`;
	}
	try {
		const res = await fetch(`${BASE_URL}${url}`, options);
		return await checkReponse(res);
	} catch (err: any & { message: string }) {
		if (err.message === 'jwt expired') {
			const refreshData = await refreshToken(); //обновляем токен
			if (options && options.headers) {
				options.headers.authorization = refreshData.accessToken;
			}
			const res = await fetch(url, options); //повторяем запрос
			return await checkReponse(res);
		} else {
			return Promise.reject(err);
		}
	}
};
