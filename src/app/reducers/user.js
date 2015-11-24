import * as types from '../constants/ActionTypes';

const initialState = {
  userName : '',
  user_no : 0,
  isLogin : false,
}

export default function user(state = initialState, action) {
  switch (action.type) {
    case types.LOGIN_USER:
      return Object.assign({}, state, {
        userName : action.userName,
        user_no : action.user_no,
        isLogin : true,
      });

    case types.LOGOUT_USER:
      return Object.assign({}, state, {
        userName : null,
        user_no : null,
        isLogin : false,
      });

    default:
      return state;
  }
}
