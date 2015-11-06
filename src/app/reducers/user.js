import * as types from '../constants/ActionTypes';

const initialState = 
  {
  	userName : '',
  	isLogin : false,
  }


export default function user(state = initialState, action) {
	switch (action.type) {
		case types.LOGIN_USER:
			return Object.assign({}, state, {
				userName : action.userName,
				isLogin : true,
			});

		default:
			return state;
	}
}
