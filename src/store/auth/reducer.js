import {
	GET_USER_SUCCESS,
	LOGIN_SUCCESS,
	LOGOUT_SUCCESS,
	SET_AUTH_FLAG,
	SET_USER,
} from '@store/auth/action';

const initialState = {
	user: null,
	isAuthChecked: false,
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
		default: {
			return state;
		}
	}
};

function selectIsAuthChecked(state) {
	return state.isAuthChecked;
}
function selectUser(state) {
	return state.user;
}
