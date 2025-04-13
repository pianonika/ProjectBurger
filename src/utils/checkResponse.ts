import { BASE_URL } from '@store/vars';
import Dispatcher from 'undici-types/dispatcher';
import {
	BodyInit,
	HeadersInit,
	ReferrerPolicy,
	RequestCredentials,
	RequestDuplex,
	RequestMode,
	RequestRedirect,
} from 'undici-types/fetch';
export interface RequestInit {
	method?: string;
	keepalive?: boolean;
	headers?: HeadersInit;
	body?: BodyInit;
	redirect?: RequestRedirect;
	integrity?: string;
	signal?: AbortSignal;
	credentials?: RequestCredentials;
	mode?: RequestMode;
	referrer?: string;
	referrerPolicy?: ReferrerPolicy;
	window?: null;
	dispatcher?: Dispatcher;
	duplex?: RequestDuplex;
}

export const checkResponse = (res: any) => {
	if (res.ok) {
		return res.json();
	}
	return Promise.reject(`Ошибка ${res.status}`);
};

export const checkSuccess = (res: any) => {
	if (res && res.success) {
		return res;
	}
	return Promise.reject(`Ответ не success: ${res}`);
};

export const request = (endpoint: string | URL | Request, options: any) => {
	return fetch(`${BASE_URL}${endpoint}`, options)
		.then(checkResponse)
		.then(checkSuccess);
};

const checkReponse = (res: any) => {
	return res.ok
		? res.json()
		: res.json().then((err: any) => Promise.reject(err));
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

export const fetchWithRefresh = async (url: any, options: any) => {
	const accessToken = localStorage.getItem('accessToken');
	options.headers.authorization = `${accessToken}`;
	try {
		const res = await fetch(`${BASE_URL}${url}`, options);
		return await checkReponse(res);
	} catch (err: any) {
		if (err.message === 'jwt expired') {
			const refreshData = await refreshToken(); //обновляем токен
			options.headers.authorization = refreshData.accessToken;
			const res = await fetch(url, options); //повторяем запрос
			return await checkReponse(res);
		} else {
			return Promise.reject(err);
		}
	}
};
