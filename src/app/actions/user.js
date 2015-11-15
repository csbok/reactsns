import * as types from '../constants/ActionTypes'

export function loginUser(userName, user_no) {
	return { type: types.LOGIN_USER, userName, user_no };
}

export function logoutUser() {
	return { type: types.LOGOUT_USER };
}