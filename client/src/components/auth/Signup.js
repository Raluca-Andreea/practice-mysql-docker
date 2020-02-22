import React from 'react'
import { bindActionCreators } from "redux"
import { handleSignupChange, handleSignupSubmit } from '../../actions/actionCreator'
import { connect } from 'react-redux'


const mapStateToProps = (state) => {

  return {
    state
  };
}

const mapDispatchToProps = dispatch => {

  return bindActionCreators(
    {
      handleSignupChange,
      handleSignupSubmit
    },
    dispatch
  );
}


const Signup = (props) => {

  let {username, email, password, city, age} = props.state.signup

  return (
  
       <div className="form-container">
          <div className="input-form-container">
          <h2>Signup</h2>
          <form onSubmit={(e)=> props.handleSignupSubmit(e, username, email, password, city, age, props.history, "signup")}>
              Username: <input name="username" type="text" value={username} onChange={props.handleSignupChange} /> <br></br>
              Email: <input name="email" type="email" value={email} onChange={props.handleSignupChange} />
              <br></br>
              Password: <input name="password" type="password" value={password} onChange={props.handleSignupChange} /> <br></br>
              City: <input name="city" type="text" value={city} onChange={props.handleSignupChange} /> 
              <br></br>
              Age: <input name="age" type="number" value={age} onChange={props.handleSignupChange} /> 
              <br></br>
              <input type="submit" value="Signup" className="submit-input"/>
          </form>
          {props.state.auth.statusText.includes("Error") && <div className="error-auth" >{props.state.auth.statusText}</div>}
          </div>
      </div>

  )
}

export default connect(mapStateToProps, mapDispatchToProps)(Signup)

