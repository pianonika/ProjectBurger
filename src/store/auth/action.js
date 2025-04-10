import { fetchWithRefresh } from '@utils/checkResponse';
import { Navigate, useNavigate } from 'react-router-dom';
import React from 'react';

export const LOGIN_REQUEST = 'LOGIN_REQUEST';
export const LOGIN_FAILED = 'LOGIN_FAILED';
export const LOGIN_SUCCESS = 'LOGIN_SUCCESS';
export const LOGOUT_REQUEST = 'LOGOUT_REQUEST';
export const LOGOUT_SUCCESS = 'LOGOUT_SUCCESS';
export const LOGOUT_FAILED = 'LOGOUT_FAILED';
export const REGISTER_REQUEST = 'REGISTER_REQUEST';
export const REGISTER_SUCCESS = 'REGISTER_SUCCESS';
export const REGISTER_FAILED = 'REGISTER_FAILED';
export const REFRESH_USER_REQUEST = 'REFRESH_USER_REQUEST';
export const REFRESH_USER_FAILED = 'REFRESH_USER_FAILED ';
export const FORGOT_REQUEST = 'FORGOT_REQUEST';
export const FORGOT_SUCCESS = 'FORGOT_SUCCESS';
export const FORGOT_FAILED = 'FORGOT_FAILED';
export const RESET_PASSWORD_REQUEST = 'RESET_PASSWORD_REQUEST';
export const RESET_PASSWORD_SUCCESS = 'RESET_PASSWORD_SUCCESS';
export const RESET_PASSWORD_FAILED = 'RESET_PASSWORD_FAILED';
export const GET_USER_REQUEST = 'GET_USER_REQUEST';
export const GET_USER_SUCCESS = 'GET_USER_SUCCESS';
export const GET_USER_FAILED = 'GET_USER_FAILED';
export const SET_AUTH_FLAG = 'SET_AUTH_FLAG';
export const SET_USER = 'SET_USER';

export function loginRequest(data) {
	return function (dispatch) {
		dispatch({
			type: LOGIN_REQUEST,
		});

		fetchWithRefresh('/api/auth/login', {
			method: 'POST',
			body: JSON.stringify(data),
			headers: {
				'Content-Type': 'application/json;charset=utf-8',
			},
		})
			.then((res) => {
				dispatch({
					type: LOGIN_SUCCESS,
					payload: res.user,
				});

				localStorage.setItem('refreshToken', res.refreshToken);
				localStorage.setItem('accessToken', res.accessToken);
			})
			.catch((err) => {
				dispatch({
					type: LOGIN_FAILED,
				});
			});
	};
}

export function refreshToken(data) {
	return function (dispatch) {
		dispatch({
			type: LOGIN_REQUEST,
		});

		fetchWithRefresh('/api/auth/login', {
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

export function logoutRequest() {
	return function (dispatch) {
		dispatch({
			type: LOGOUT_REQUEST,
		});

		fetchWithRefresh('/api/auth/logout', {
			method: 'POST',
			body: JSON.stringify({ token: localStorage.getItem('refreshToken') }),
			headers: {
				'Content-Type': 'application/json;charset=utf-8',
			},
		})
			.then((res) => {
				dispatch({
					type: LOGOUT_SUCCESS,
					payload: res,
				});
				localStorage.removeItem('refreshToken');
				localStorage.removeItem('accessToken');
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

		fetchWithRefresh('/api/auth/register', {
			method: 'POST',
			body: JSON.stringify({ ...data }),
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

export function forgotRequest(data) {
	return function (dispatch) {
		dispatch({
			type: FORGOT_REQUEST,
		});

		fetchWithRefresh('/api/password-reset', {
			method: 'POST',
			body: data,
			headers: {
				'Content-Type': 'application/json;charset=utf-8',
			},
		})
			.then((res) => {
				dispatch({
					type: FORGOT_SUCCESS,
					payload: res,
				});
			})
			.catch((err) => {
				dispatch({
					type: FORGOT_FAILED,
				});
			});
	};
}

export function resetPassword(data) {
	return function (dispatch) {
		dispatch({
			type: RESET_PASSWORD_REQUEST,
		});

		fetchWithRefresh('/api/password-reset/reset', {
			method: 'POST',
			body: data,
			headers: {
				'Content-Type': 'application/json;charset=utf-8',
			},
		})
			.then((res) => {
				dispatch({
					type: RESET_PASSWORD_SUCCESS,
					payload: res,
				});
			})
			.catch((err) => {
				dispatch({
					type: RESET_PASSWORD_FAILED,
				});
			});
	};
}
export function updateUser(data) {
	return function (dispatch) {
		dispatch({
			type: REFRESH_USER_REQUEST,
		});

		fetchWithRefresh('/api/auth/user', {
			method: 'PATCH',
			body: data,
			headers: {
				'Content-Type': 'application/json;charset=utf-8',
			},
		})
			.then((res) => {
				dispatch({
					type: SET_USER,
					payload: res.user,
				});
			})
			.catch((err) => {
				dispatch({
					type: REFRESH_USER_FAILED,
				});
			});
	};
}

export function getUser() {
	return function (dispatch) {
		dispatch({
			type: GET_USER_REQUEST,
		});

		fetchWithRefresh('/api/auth/user', {
			method: 'GET',
			headers: {
				'Content-Type': 'application/json;charset=utf-8',
			},
		})
			.then((res) => {
				dispatch({
					type: SET_USER,
					payload: res.user,
				});
			})
			.catch((err) => {
				dispatch({
					type: GET_USER_FAILED,
				});
			})
			.finally(() => {
				dispatch({
					type: SET_AUTH_FLAG,
					payload: true,
				});
			});
	};
}

export function checkUserAuth(data) {
	return function (dispatch) {
		if (localStorage.getItem('accessToken')) {
			dispatch(getUser());
		} else {
			dispatch({
				type: SET_AUTH_FLAG,
				payload: true,
			});
		}
	};
}
