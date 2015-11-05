import * as types from '../constant/ActionTypes'

export function loginUser(userName) {
	return { type: types.LOGIN_USER, userName };
}