import {
	FORGOT_REQUEST,
	FORGOT_SUCCESS,
	LOGIN_SUCCESS,
	LOGOUT_SUCCESS,
	REGISTER_REQUEST,
	REGISTER_SUCCESS,
	RESET_PASSWORD_REQUEST,
	RESET_PASSWORD_SUCCESS,
	SET_AUTH_FLAG,
	SET_USER,
} from '@store/auth/action';

const initialState = {
	user: null,
	isAuthChecked: false,
	requestInProgress: false,
};

export const authorizationReducer = (state = initialState, action) => {
	switch (action.type) {
		case SET_USER: {
			return {
				...state,
				user: { ...state.user, ...action.payload },
			};
		}
		case LOGIN_SUCCESS: {
			return {
				user: { ...state.user, ...action.payload },
				isAuthChecked: true,
			};
		}
		case LOGOUT_SUCCESS: {
			return {
				...state,
				user: null,
				isAuthChecked: false,
			};
		}
		case SET_AUTH_FLAG: {
			return {
				...state,
				isAuthChecked: action.payload,
			};
		}
		case FORGOT_REQUEST: {
			return {
				...state,
				requestInProgress: true,
			};
		}
		case FORGOT_SUCCESS: {
			return {
				...state,
				requestInProgress: false,
			};
		}
		case RESET_PASSWORD_REQUEST: {
			return {
				...state,
				requestInProgress: true,
			};
		}
		case RESET_PASSWORD_SUCCESS: {
			return {
				...state,
				requestInProgress: false,
			};
		}
		case REGISTER_REQUEST: {
			return {
				...state,
				requestInProgress: true,
			};
		}
		case REGISTER_SUCCESS: {
			return {
				...state,
				requestInProgress: false,
			};
		}
		default: {
			return state;
		}
	}
};
