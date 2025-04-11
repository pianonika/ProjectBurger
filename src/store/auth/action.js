import { fetchWithRefresh } from '@utils/checkResponse';

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
				console.log(err);
				alert(err.message);
				dispatch({
					type: LOGIN_FAILED,
					payload: err,
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
					payload: err,
				});
			});
	};
}

export function logoutRequest() {
	return function (dispatch) {
		dispatch({
			type: LOGOUT_REQUEST,
		});
		// dispatch({
		// 	type: LOGOUT_SUCCESS,
		// });

		fetchWithRefresh('/api/auth/logout', {
			method: 'POST',
			body: JSON.stringify({ token: localStorage.getItem('refreshToken') }),
			headers: {
				'Content-Type': 'application/json;charset=utf-8',
			},
		})
			.then(() => {
				dispatch({
					type: LOGOUT_SUCCESS,
				});
				localStorage.removeItem('refreshToken');
				localStorage.removeItem('accessToken');
				dispatch(checkUserAuth());
			})
			.catch((err) => {
				dispatch({
					type: LOGOUT_FAILED,
					payload: err,
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
				alert(err.message);
				dispatch({
					type: REGISTER_FAILED,
					payload: err,
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
				alert(err.message);
				dispatch({
					type: FORGOT_FAILED,
					payload: err,
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
				if (res.success) {
					localStorage.removeItem('forgotPage');
				}
			})
			.catch((err) => {
				alert(err.message);
				dispatch({
					type: RESET_PASSWORD_FAILED,
					payload: err,
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
				alert('Данные успешно сохранены')
			})
			.catch((err) => {
				dispatch({
					type: REFRESH_USER_FAILED,
					payload: err,
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
					payload: err,
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

export function checkUserAuth() {
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
