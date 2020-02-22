import {combineReducers} from 'redux'
import authReducer from './authReducer'
import loginReducer from './loginReducer'
import signupReducer from './signupReducer'
import drawingsReducer from './drawingsReducer'
import profileReducer from './profileReducer'
import listingReducer from './listingReducer'
import modalReducer from './modalReducer'

export default combineReducers ({
  auth: authReducer,
  login: loginReducer,
  signup: signupReducer,
  drawings: drawingsReducer,
  profile: profileReducer,
  listing:listingReducer,
  modal: modalReducer
})