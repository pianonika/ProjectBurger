import uuid from 'react-uuid';

export const ADD_FILLINGS_ITEM = 'ADD_FILLINGS_ITEM';
export const REMOVE_FILLINGS_ITEM = 'REMOVE_FILLINGS_ITEM';
export const SET_BUN = 'SET_BUN';

const addFillingsItem = (payload) => ({
	type: ADD_FILLINGS_ITEM,
	payload: payload,
});

const removeFillingsItem = (payload) => ({
	type: REMOVE_FILLINGS_ITEM,
	payload: payload,
});

const setBun = (payload) => ({
	type: SET_BUN,
	payload: payload,
});
