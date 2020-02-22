import { LOGIN_USER_SUCCESS, LOGIN_USER_FAILURE, LOGOUT_USER, } from '../actions/actionTypes'

const initialState = {
  loggedInUser: null,
  loggedInUser_id: null,
  statusText: '',
  isAuthenticated: false,
  isAuthenticating: false,
}


const completAuthReducer = (state=initialState, action) => {

  switch (action.type) {
    case LOGIN_USER_SUCCESS:
    
    return {
      ...state,
      loggedInUser: action.payload,
      loggedInUser_id: action.payload.id,
      statusText: 'You have been successfully logged in.',
      isAuthenticated: true,
      isAuthenticating: false,
    }

    case LOGIN_USER_FAILURE:
    return {
      ...state,
      loggedInUser: null,
      loggedInUser_id: null,
      statusText: `Authentication Error: ${action.payload.status} ${action.payload.statusText.err.response.data.message}`,
      isAuthenticated: false,
      isAuthenticating: false,
    }

    case LOGOUT_USER: 
    return {
      loggedInUser: null,
      loggedInUser_id: null,
      statusText: 'You have been successfully logged out.',
      isAuthenticated: false,
      isAuthenticating: false, 
    }
    
    default:
    return state
  }

}

export default completAuthReducer