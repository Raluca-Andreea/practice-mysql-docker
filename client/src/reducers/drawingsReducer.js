import { GET_ALL_DRAWINGS, GET_ONE_DRAWING, HANDLE_DRAWING_CHANGE, HANDLE_FILE_UPLOAD } from '../actions/actionTypes'

const initialState = {
  drawings: [],
  drawing: undefined,
  form: {
    title: '',
    description: '',
    price: '',
    image:''
  }
}

const drawingsReducer = (state=initialState, action) => {

  switch (action.type) {

    case GET_ALL_DRAWINGS:
    let drawingsArray
    if(action.payload.length <= 20) {
      drawingsArray = action.payload
    } else {
      let min = Math.floor(Math.random() * (action.payload - 20))
      drawingsArray = Math.floor(Math.random() * (action.payload.length - min)) + min
    }
    return {
      ...state,
      drawings: drawingsArray
    }

    case GET_ONE_DRAWING:
    return {
      ...state,
      drawing: action.payload
    }

    case HANDLE_DRAWING_CHANGE:
    return {
      ...state,
      form: {
        ...state.form,
        [action.name]: action.value
      }
    }

    case HANDLE_FILE_UPLOAD:
    return {
      ...state,
      form: {
        ...state.form,
        image: action.payload
      }
    }

    default:
    return state
  }



}

export default drawingsReducer