import React from 'react'
import { bindActionCreators } from "redux"
import { handleLoginChange, handleLoginSubmit } from '../../actions/actionCreator'
import { connect } from 'react-redux'


const mapStateToProps = (state) => {
 
  return {
    state
    // login: props.state
  };
}

const mapDispatchToProps = dispatch => {

  return bindActionCreators(
    {
      handleLoginChange,
      handleLoginSubmit
    },
    dispatch
  );
}


const Login = (props) => {
console.log(props.state.login)
  let { username, password } = props.state.login

  return (
  
       <div className="form-container">
       <div className="input-form-container">
          <h2>Login</h2>
          <form onSubmit={(e)=> props.handleLoginSubmit(e, username, password, props.history, "login")}>
              Username: <input name="username" type="text" value={username} onChange={props.handleLoginChange} /> <br></br>
            
              Password: <input name="password" type="password" value={password} onChange={props.handleLoginChange} /> <br></br>
              <input type="submit" value="Login" className="submit-input"/>
          </form>
         {props.state.auth.statusText.includes("Error") && <div className="error-auth" >{props.state.auth.statusText}</div>}
         </div>
      </div>

  )
}

export default connect(mapStateToProps, mapDispatchToProps)(Login)