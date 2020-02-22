import { HANDLE_LISTING_CHANGE } from '../actions/actionTypes'

const initialState = {
  title: "",
  description: "",
}

const signupReducer = (state=initialState, action) => {

  switch (action.type) {

    case HANDLE_LISTING_CHANGE:
    return {
      ...state,
      [action.name]: action.value
    }


    default:
    return state
  }



}

export default signupReducer