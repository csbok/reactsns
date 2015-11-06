import * as types from '../constants/ActionTypes'

export function loginUser(userName) {
	return { type: types.LOGIN_USER, userName };
}
