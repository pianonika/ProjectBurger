import { BASE_URL } from '../services/vars';
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

export const request = (
	endpoint: string | URL | Request,
	options: any
) => {
	return fetch(`${BASE_URL}${endpoint}`, options)
		.then(checkResponse)
		.then(checkSuccess);
};
