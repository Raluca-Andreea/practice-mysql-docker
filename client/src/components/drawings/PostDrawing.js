import React from 'react'
import { bindActionCreators } from "redux"
import { handleDrawingChange, handleDrawingSubmit, handleFileUpload, closeModal } from '../../actions/actionCreator'
import { connect } from 'react-redux'


const mapStateToProps = (state) => {
  return {
    state
  };
}

const mapDispatchToProps = dispatch => {

  return bindActionCreators(
    {
      handleDrawingChange,
      handleDrawingSubmit,  
      handleFileUpload,
      closeModal,
    },
    dispatch
  );
}


const postDrawing = (props) => {
  let {title, description, price} = props.state.drawings.form

  return (
       <>
       <div className="form-container">
          <div className="input-form-container">
          <h2>Post drawing</h2>
          <form onSubmit={(e)=> props.handleDrawingSubmit(e, props.state.drawings.form, props.state.auth.loggedInUser.id, props.history, "drawing")} encType="multipart/form-data">
          
              Title: <input name="title" type="text" value={title} onChange={props.handleDrawingChange} /> <br></br>
              Description: <input name="description" type="text" value={description} onChange={props.handleDrawingChange} />
              <br></br>
              Price: <input name="price" type="number" value={price} onChange={props.handleDrawingChange} /> <br></br>
              Image: <input name="image" type="file" onChange={props.handleFileUpload} /> <br></br>

              <input type="submit" value="post Drawing" className="submit-input"/>
          </form>
          
          </div>
      </div>
  </>
  )
}

export default connect(mapStateToProps, mapDispatchToProps)(postDrawing)

