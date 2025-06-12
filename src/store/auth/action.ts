import { fetchWithRefresh } from '@utils/checkResponse';
import { IUser } from '@store/auth/reducer';
import { AppDispatch, AppThunkAction } from '../../index';

export const LOGIN_REQUEST = 'LOGIN_REQUEST' as const;
export const LOGIN_FAILED = 'LOGIN_FAILED' as const;
export const LOGIN_SUCCESS = 'LOGIN_SUCCESS' as const;
export const LOGOUT_REQUEST = 'LOGOUT_REQUEST' as const;
export const LOGOUT_SUCCESS = 'LOGOUT_SUCCESS' as const;
export const LOGOUT_FAILED = 'LOGOUT_FAILED' as const;
export const REGISTER_REQUEST = 'REGISTER_REQUEST' as const;
export const REGISTER_SUCCESS = 'REGISTER_SUCCESS' as const;
export const REGISTER_FAILED = 'REGISTER_FAILED' as const;
export const REFRESH_USER_REQUEST = 'REFRESH_USER_REQUEST' as const;
export const REFRESH_USER_FAILED = 'REFRESH_USER_FAILED ' as const;
export const FORGOT_REQUEST = 'FORGOT_REQUEST' as const;
export const FORGOT_SUCCESS = 'FORGOT_SUCCESS' as const;
export const FORGOT_FAILED = 'FORGOT_FAILED' as const;
export const RESET_PASSWORD_REQUEST = 'RESET_PASSWORD_REQUEST' as const;
export const RESET_PASSWORD_SUCCESS = 'RESET_PASSWORD_SUCCESS' as const;
export const RESET_PASSWORD_FAILED = 'RESET_PASSWORD_FAILED' as const;
export const GET_USER_REQUEST = 'GET_USER_REQUEST' as const;
export const GET_USER_FAILED = 'GET_USER_FAILED' as const;
export const SET_AUTH_FLAG = 'SET_AUTH_FLAG' as const;
export const SET_USER = 'SET_USER' as const;

export interface ILoginRequest {
	readonly type: typeof LOGIN_REQUEST;
}
export interface ILoginFailed {
	readonly type: typeof LOGIN_FAILED;
}
export interface ILoginSuccess {
	readonly type: typeof LOGIN_SUCCESS;
	readonly payload: { user: IUser };
}

export interface ILogoutRequest {
	readonly type: typeof LOGOUT_REQUEST;
}
export interface ILogoutSuccess {
	readonly type: typeof LOGOUT_SUCCESS;
}
export interface ILogoutFailed {
	readonly type: typeof LOGOUT_FAILED;
}

export interface IRegisterRequest {
	readonly type: typeof REGISTER_REQUEST;
}
export interface IRegisterSuccess {
	readonly type: typeof REGISTER_SUCCESS;
}
export interface IRegisterFailed {
	readonly type: typeof REGISTER_FAILED;
}

export interface IRefreshRequest {
	readonly type: typeof REFRESH_USER_REQUEST;
}
export interface IRefreshFailed {
	readonly type: typeof REFRESH_USER_FAILED;
}

export interface IForgotRequest {
	readonly type: typeof FORGOT_REQUEST;
}
export interface IForgotOrderAction {
	readonly type: typeof FORGOT_SUCCESS;
}
export interface IForgotFailed {
	readonly type: typeof FORGOT_FAILED;
}

export interface IResetPasswordRequest {
	readonly type: typeof RESET_PASSWORD_REQUEST;
}
export interface IResetPasswordSendOrderAction {
	readonly type: typeof RESET_PASSWORD_SUCCESS;
}
export interface IResetPasswordFailed {
	readonly type: typeof RESET_PASSWORD_FAILED;
}

export interface IGetUserRequest {
	readonly type: typeof GET_USER_REQUEST;
}
export interface IGetUserFailed {
	readonly type: typeof GET_USER_FAILED;
}

export interface IAuthFlag {
	readonly type: typeof SET_AUTH_FLAG;
	readonly payload: boolean;
}
export interface ISetUser {
	readonly type: typeof SET_USER;
	readonly payload: IUser;
}

export const loginRequest =
	(data): AppThunkAction =>
	(dispatch: AppDispatch) => {
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
					payload: res['user'],
				});
				localStorage.setItem('refreshToken', res['refreshToken']);
				localStorage.setItem('accessToken', res['accessToken']);
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

export const refreshToken =
	(data): AppThunkAction =>
	(dispatch: AppDispatch) => {
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
					payload: res['user'],
				});
			})
			.catch((err) => {
				dispatch({
					type: LOGIN_FAILED,
					payload: err,
				});
			});
	};

export const logoutRequest = (): AppThunkAction => (dispatch: AppDispatch) => {
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
		.then(() => {
			dispatch({
				type: LOGOUT_SUCCESS,
			});
			localStorage.removeItem('refreshToken');
			localStorage.removeItem('accessToken');
			dispatch(checkUserAuthThunk());
		})
		.catch((err) => {
			dispatch({
				type: LOGOUT_FAILED,
				payload: err,
			});
		});
};

export const register =
	(data): AppThunkAction =>
	(dispatch: AppDispatch) => {
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

export const forgotRequest =
	(data): AppThunkAction =>
	(dispatch: AppDispatch) => {
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

export const resetPassword =
	(data): AppThunkAction =>
	(dispatch: AppDispatch) => {
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
				if (res['success']) {
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

export const updateUser =
	(data): AppThunkAction =>
	(dispatch: AppDispatch) => {
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
					payload: res['user'],
				});
				alert('Данные успешно сохранены');
			})
			.catch((err) => {
				dispatch({
					type: REFRESH_USER_FAILED,
					payload: err,
				});
			});
	};

export const getUser = (): AppThunkAction => (dispatch: AppDispatch) => {
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
				payload: res['user'],
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
export const CHECK_USER_AUTH = 'CHECK_USER_AUTH' as const;
export interface ICheckUserAuth {
	readonly type: typeof CHECK_USER_AUTH;
}
export const checkUserAuthAction = (): ICheckUserAuth => ({
	type: CHECK_USER_AUTH,
});
export const checkUserAuthThunk =
	(): AppThunkAction => (dispatch: AppDispatch) => {
		dispatch(checkUserAuthAction());
		if (localStorage.getItem('accessToken')) {
			dispatch(getUser());
		} else {
			dispatch({
				type: SET_AUTH_FLAG,
				payload: true,
			});
		}
	};
// export const checkUserAuth = () => {
// 	return (dispatch) => {
// 		if (localStorage.getItem("accessToken")) {
// 			api.getUser()
// 				.then(res => dispatch(res.user))
// 				.finally(() => dispatch(setAuthChecked(true)));
// 		} else {
// 			dispatch(setAuthChecked(true));
// 		}
// 	};
// };

export type IAuthActions =
	| ILoginRequest
	| ILoginFailed
	| ILoginSuccess
	| ILogoutRequest
	| ILogoutSuccess
	| ILogoutFailed
	| IRegisterRequest
	| IRegisterSuccess
	| IRegisterFailed
	| IRefreshRequest
	| IRefreshFailed
	| IForgotRequest
	| IForgotOrderAction
	| IForgotFailed
	| IResetPasswordRequest
	| IResetPasswordSendOrderAction
	| IResetPasswordFailed
	| IGetUserRequest
	| IGetUserFailed
	| ISetUser
	| ICheckUserAuth
	| IAuthFlag;
