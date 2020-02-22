import { ALL_DRAWINGS, ALL_LISTINGS, ALL_PERSONAL_DRAWINGS } from '../actions/actionTypes'

const initialState = {
  boughtDrawings: [],
  allListings: [],
  pageOnload: false,
  personalDrawings: []
}

const profileReducer = (state=initialState, action) => {

  switch (action.type) {

    case ALL_DRAWINGS:
    return {
      ...state,
      boughtDrawings: action.payload,
      pageOnload: action.payload.length !== 0 ? true : false
    }

    case ALL_LISTINGS:
    return {
      ...state,
      allListings: action.payload
    }

    case ALL_PERSONAL_DRAWINGS:
    console.log(action.payload)
    return {
      ...state,
      personalDrawings: action.payload,
      pageOnload: action.payload.length !== 0 ? true : false
    }

    default:
    return state
  }



}

export default profileReducer