import { OPEN_MODAL, CLOSE_MODAL } from '../actions/actionTypes'

const initialState = { 
  modalDrawingIsOpen: false,
  modalListingIsOpen: false,
  modalLoginIsOpen: false,
  modalSignupIsOpen: false
}

const ModalReducer = (state=initialState, action) => {

  switch (action.type){

      case OPEN_MODAL:  
      return {
          ...state,
          modalDrawingIsOpen: action.payload.includes("drawing") ? true : false,
          modalListingIsOpen: action.payload.includes("listing") ? true : false,
          modalLoginIsOpen: action.payload.includes("login") ? true : false,
          modalSignupIsOpen: action.payload.includes("signup") ? true : false,
        }
      
      case CLOSE_MODAL:
        return {
            ...state,
          modalDrawingIsOpen: typeof action.payload === "object" ? false : 
          (action.payload.includes("drawing") || action.payload.includes("listing") || action.payload.includes("login") || action.payload.includes("signup") || action.payload.keyCode === 27 ? 
          false : true),

          modalListingIsOpen: typeof action.payload === "object" ? false : 
          (action.payload.includes("listing") || action.payload.includes("drawing") || action.payload.includes("login") || action.payload.includes("signup") || action.payload.keyCode === 27 ? false : true),

          modalLoginIsOpen: typeof action.payload === "object" ? false : 
          (action.payload.includes("login") || action.payload.includes("drawing") || action.payload.includes("listing") || action.payload.includes("signup") || action.payload.keyCode === 27 ? false : true),

          modalSignupIsOpen: typeof action.payload === "object" ? false : 
          (action.payload.includes("signup") || action.payload.includes("drawing") || action.payload.includes("listing") || action.payload.includes("login") || action.payload.keyCode === 27 ? false : true)
        }

      default:
      return state
  }
}

export default ModalReducer