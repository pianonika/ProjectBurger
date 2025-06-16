import { authorizationReducer, initialState } from './reducer';
import {
	FORGOT_REQUEST,
	IAuthActions,
	LOGIN_SUCCESS,
	LOGOUT_SUCCESS,
	REGISTER_REQUEST,
	REGISTER_SUCCESS,
	RESET_PASSWORD_REQUEST,
	RESET_PASSWORD_SUCCESS,
	SET_AUTH_FLAG,
	SET_USER,
} from '@store/auth/action';

const user = { email: 'test@test.com', name: 'Igor' };

describe('Auth reducer', () => {
	it('authorization: should return the initial state', () => {
		const action = { type: '', payload: user } as unknown as IAuthActions;
		const state = authorizationReducer(undefined, action);
		expect(state).toEqual(initialState);
	});

	it('authorization setUser', () => {
		const action = { type: SET_USER, payload: user };
		const state = authorizationReducer(initialState, action);

		expect(state).toEqual({ ...initialState, user: user });
	});

	it('authorization login success', () => {
		const action = { type: LOGIN_SUCCESS, payload: { user: user } };
		const state = authorizationReducer(initialState, action);

		expect(state).toEqual({
			...initialState,
			user: { ...initialState.user, ...action.payload.user },
			isAuthChecked: true,
		});
	});

	it('authorization logout success', () => {
		const action = { type: LOGOUT_SUCCESS };
		const state = authorizationReducer(initialState, action);

		expect(state).toEqual({
			...initialState,
			user: null,
			isAuthChecked: false,
		});
	});

	it('authorization set auth flag', () => {
		const action = { type: SET_AUTH_FLAG, payload: false };
		const state = authorizationReducer(initialState, action);

		expect(state).toEqual({
			...initialState,
			isAuthChecked: action.payload,
		});
	});

	it('authorization set auth flag', () => {
		const action = { type: SET_AUTH_FLAG, payload: false };
		const state = authorizationReducer(initialState, action);

		expect(state).toEqual({
			...initialState,
			isAuthChecked: action.payload,
		});
	});

	it('authorization forgot password', () => {
		const action = { type: FORGOT_REQUEST };
		const state = authorizationReducer(initialState, action);

		expect(state).toEqual({
			...initialState,
			requestInProgress: true,
		});
	});

	it('authorization reset password request', () => {
		const action = { type: RESET_PASSWORD_REQUEST };
		const state = authorizationReducer(initialState, action);

		expect(state).toEqual({
			...initialState,
			requestInProgress: true,
		});
	});

	it('authorization reset password success', () => {
		const action = { type: RESET_PASSWORD_SUCCESS };
		const state = authorizationReducer(initialState, action);

		expect(state).toEqual({
			...initialState,
			requestInProgress: false,
		});
	});

	it('authorization register request', () => {
		const action = { type: REGISTER_REQUEST };
		const state = authorizationReducer(initialState, action);

		expect(state).toEqual({
			...initialState,
			requestInProgress: true,
		});
	});

	it('authorization register success', () => {
		const action = { type: REGISTER_SUCCESS };
		const state = authorizationReducer(initialState, action);

		expect(state).toEqual({
			...initialState,
			requestInProgress: false,
		});
	});
});
