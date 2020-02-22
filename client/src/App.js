import React, {Component} from 'react'
import './App.scss';
import { Switch, Route } from 'react-router-dom'
import { Redirect } from 'react-router-dom'
import Navigation from './components/nav/Nav'
import Profile from './components/profile/Profile'
import Home from './components/Home'
import DrawingDetail from './components/drawings/DrawingDetail'
import { connect } from 'react-redux'

const mapStateToProps = (state) => {
  return {
    auth: state.auth
  };
}

const App = (props) => {
    return (
      <div className="app">      
          <Navigation/>
        
            <Switch>

            <Route exact path='/' component={Home} />
            <Route path="/drawing/:id" render={match => <DrawingDetail {...match} /> } />

            <Route path="/profile" render={match =>
            props.auth.isAuthenticated ? <Profile {...match} /> : <Redirect to="/" />
            } />
   
           </Switch>        
        </div> 
    );
}

export default connect(mapStateToProps)(App)
