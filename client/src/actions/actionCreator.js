import {  HANDLE_SIGNUP_CHANGE, HANDLE_LOGIN_CHANGE, 
  LOGIN_USER_FAILURE, LOGIN_USER_SUCCESS, LOGOUT_USER, GET_ALL_DRAWINGS, GET_ONE_DRAWING, ALL_DRAWINGS, ALL_LISTINGS, HANDLE_LISTING_CHANGE, HANDLE_LISTING_SUBMIT, HANDLE_DRAWING_CHANGE, HANDLE_FILE_UPLOAD, OPEN_MODAL, CLOSE_MODAL, ALL_PERSONAL_DRAWINGS } from './actionTypes'

import Service from '../services/auth-services';
import drawService from '../services/drawings-services'
import listService from '../services/listing-services'

let authService = new Service()
let drawingsService = new drawService()
let listingService = new listService()


// AUTHENTICATION

  export const handleSignupChange = (e) => (
    {
      type: HANDLE_SIGNUP_CHANGE,
      name: e.target.name,
      value: e.target.value,
    }
  )
  
  export const handleLoginChange = (e) => (
    {
      type: HANDLE_LOGIN_CHANGE,
      name: e.target.name,
      value: e.target.value,
    }
  )



  // LOGIN FAILURE - SUCCES

export const loginUserSuccess = (data) => {
  return {
    type: LOGIN_USER_SUCCESS,
    payload: data
  }
}

export const loginUserFailure = (error) => {
  return {
    type: LOGIN_USER_FAILURE,
    payload: {
      status: error.response.status,
      statusText: error.response.statusText
    }
  }
}

//LOGOUT

export const logout = () => {
  return {
    type: LOGOUT_USER,
  }
}




// FORMS - HANDLE SUBMIT

export const handleSignupSubmit = (e, username, email, password, city, age, history, modalType) => {

  e.preventDefault()
  return function (dispatch) {
    authService.signup(username, email, password, city, age)
    .then(response => {
      console.log(response)
        dispatch(loginUserSuccess( response.data));
        dispatch(closeModal(modalType))      
    })
    .catch(err => {
      console.log(err)
      dispatch(loginUserFailure({
        response: {
            status: 403,
            statusText: {err},
        }
    }))
    })
  } 
}



export const handleLoginSubmit = (e, username, password, history, modalType) => {

  e.preventDefault()
  return function (dispatch) {
    authService.login(username, password)
    .then(response => {
        dispatch(loginUserSuccess(response.data)); 
        dispatch(closeModal(modalType))     
    })
    .catch(err => dispatch(loginUserFailure({
      response: {
          status: 403,
          statusText: {err},
      }
  })))
  } 
}


export const logoutUser = () => {

  return function(dispatch) {
    authService.logout()
    .then(() => {
      dispatch(logout()) 
    })
    .catch(err => console.log(err))
  }

}


// DRAWINGS

export const getAllDrawings =(userId) => {
  return function (dispatch) {
    drawingsService.getAllDrawings(userId)
    .then(response => {
      console.log(response.data)
      dispatch(getDrawings(response.data))
    })
    .catch(err => console.log(err))
  }
}

const getDrawings = (drawings) => (
  {
    type: GET_ALL_DRAWINGS,
    payload: drawings,
  }
)

export const getOneDrawing = (id) => {
  return function (dispatch) {

    drawingsService.getOneDrawing(id)
    .then(response => {
      dispatch(getDrawing(response.data))
    })
    .catch(err => console.log(err))
  }
}

const getDrawing = (drawing) => (
  {
    type: GET_ONE_DRAWING,
    payload: drawing,
  }
)

export const buyDrawing = (drawing_id, customer_id, history) => {
  return function () {
    drawingsService.buyOneDrawing(drawing_id, customer_id)
    .then(() => {
      history.push('/profile')
    })
    .catch(err => console.log(err))
  }
}

export const showAllBoughtDrawings = (id) => {
  return function (dispatch) {
    
    drawingsService.showAllBoughtDrawings(id)
    .then(response => {
      dispatch(showBoughtDrawings(response.data))
    })
    .catch(err => console.log(err))
  }
}

const showBoughtDrawings = (drawings) => (
  {
    type: ALL_DRAWINGS,
    payload: drawings
  }
)

export const showAllPersonalDrawings = (id) => {
  return function (dispatch) {
    
    drawingsService.showAllPersonalDrawings(id)
    .then(response => {
      dispatch(showPersonalDrawings(response.data))
    })
    .catch(err => console.log(err))
  }
}

const showPersonalDrawings = (drawings) => (
  {
    type: ALL_PERSONAL_DRAWINGS,
    payload: drawings
  }
)



export const handleDrawingChange = (e) => (
  {
    type: HANDLE_DRAWING_CHANGE,
    name: e.target.name,
    value: e.target.value,
  }
)


const handleUploadAction = (uploadData) => (
  {
    type: HANDLE_FILE_UPLOAD,
    payload: uploadData
  }

)

export const handleFileUpload = (e) => {

  const uploadData = new FormData();
  uploadData.append("image", e.target.files[0]);

  return function(dispatch) {
    drawingsService.handleUpload(uploadData)
    .then(response => {
     dispatch(handleUploadAction(response.data.secure_url))
    })
    .catch(err => console.log(err))
  }
}


export const handleDrawingSubmit = (e, form, user, history, modalType) => {
  e.preventDefault()

  return function (dispatch) {

    drawingsService.postDrawing(form, user)
    .then(() => {
     dispatch(closeModal(modalType))
      // history.push('/profile')
    }) 
    .catch(err => console.log(err))
  }

}

//MODAL

export const openModal = (modalType) => (
  {
    type: OPEN_MODAL,
    payload: modalType
  }
)

export const closeModal = (modalType) => (
  {
    type: CLOSE_MODAL,
    payload: modalType
  }
)




//LISTING

export const handleListingChange = (e) => (
  {
    type: HANDLE_LISTING_CHANGE,
    name: e.target.name,
    value: e.target.value,
  }
)

export const handleListingSubmit = (e, title, description, user, history, modalType) => {

  e.preventDefault()
  return function (dispatch) {
    listingService.createListing(title, description, user)
    .then(() => {     
        // history.push('/profile')
        // console.log("es el submit del drawing")
        dispatch(closeModal(modalType))  
    })
    .catch(err => console.log(err))
  } 
}

export const showAllListings = (id) => {

  return function (dispatch) {
    listingService.showAllListings(id)
    .then(response => {  
      console.log(response.data)   
        dispatch(showListings(response.data))
    })
    .catch(err => console.log(err))
  } 
}

const showListings = (listings) => (
  {
    type: ALL_LISTINGS,
    payload: listings
  }
)