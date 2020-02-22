import React from 'react'
import { bindActionCreators } from "redux"
import { handleListingChange, handleListingSubmit } from '../../actions/actionCreator'
import { connect } from 'react-redux'


const mapStateToProps = (state) => {

  return {
    state
  };
}

const mapDispatchToProps = dispatch => {

  return bindActionCreators(
    {
      handleListingChange,
      handleListingSubmit
    },
    dispatch
  );
}


const createListing = (props) => {
  let {title, description} = props.state.listing

  return (
  
       <div className="form-container">
          <div className="input-form-container">
          <h2>Create listing</h2>
          <form onSubmit={(e)=> props.handleListingSubmit(e, title, description, props.state.auth.loggedInUser.id, props.history, "listing")}>
              Title: <input name="title" type="text" value={title} onChange={props.handleListingChange} /> <br></br>
              Description: <input name="description" type="text" value={description} onChange={props.handleListingChange} />
              <br></br>
              <input type="submit" value="Create listing" className="submit-input"/>
          </form>
          
          </div>
      </div>

  )
}

export default connect(mapStateToProps, mapDispatchToProps)(createListing)

