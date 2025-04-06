import { request } from '@utils/checkResponse';

export const LOGIN_REQUEST = 'LOGIN_REQUEST';
export const LOGIN_FAILED = 'LOGIN_FAILED';
export const LOGIN_SUCCESS = 'LOGIN_SUCCESS';
export const CLEAR_USER_INFO = 'CLEAR_USER_INFO';
export const LOGOUT_REQUEST = 'LOGOUT_REQUEST';
export const LOGOUT_SUCCESS = 'LOGOUT_SUCCESS';
export const LOGOUT_FAILED = 'LOGOUT_FAILED';
export const REGISTER_REQUEST = 'REGISTER_REQUEST';
export const REGISTER_SUCCESS = 'REGISTER_SUCCESS';
export const REGISTER_FAILED = 'REGISTER_FAILED';
export const TOKEN_REQUEST = 'TOKEN_REQUEST';
export const TOKEN_SUCCESS = 'TOKEN_SUCCESS';
export const TOKEN_FAILED = 'TOKEN_FAILED';

export function login(data) {
	return function (dispatch) {
		dispatch({
			type: LOGIN_REQUEST,
		});

		request('/api/auth/login', {
			method: 'POST',
			body: data,
			headers: {
				'Content-Type': 'application/json;charset=utf-8',
			},
		})
			.then((res) => {
				dispatch({
					type: LOGIN_SUCCESS,
					payload: res,
				});
			})
			.catch((err) => {
				dispatch({
					type: LOGIN_FAILED,
				});
			});
	};
}

export function logout(data) {
	return function (dispatch) {
		dispatch({
			type: LOGOUT_REQUEST,
		});

		request('/api/auth/logout', {
			method: 'POST',
			body: data,
			headers: {
				'Content-Type': 'application/json;charset=utf-8',
			},
		})
			.then((res) => {
				dispatch({
					type: LOGOUT_SUCCESS,
					payload: res,
				});
			})
			.catch((err) => {
				dispatch({
					type: LOGOUT_FAILED,
				});
			});
	};
}

export function register(data) {
	return function (dispatch) {
		dispatch({
			type: REGISTER_REQUEST,
		});

		request('/api/auth/register', {
			method: 'POST',
			body: data,
			headers: {
				'Content-Type': 'application/json;charset=utf-8',
			},
		})
			.then((res) => {
				dispatch({
					type: REGISTER_SUCCESS,
					payload: res,
				});
			})
			.catch((err) => {
				dispatch({
					type: REGISTER_FAILED,
				});
			});
	};
}

export function token(data) {
	return function (dispatch) {
		dispatch({
			type: TOKEN_REQUEST,
		});

		request('/api/auth/token', {
			method: 'POST',
			body: data,
			headers: {
				'Content-Type': 'application/json;charset=utf-8',
			},
		})
			.then((res) => {
				dispatch({
					type: TOKEN_SUCCESS,
					payload: res,
				});
			})
			.catch((err) => {
				dispatch({
					type: TOKEN_FAILED,
				});
			});
	};
}
