import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';

import {BrowserRouter as Router} from 'react-router-dom'

import {Provider} from 'react-redux'
import {store} from './store'
import {saveState} from './localStorage'
import throttle from 'lodash/throttle'
// import 'bootstrap/dist/css/bootstrap.min.css'

store.subscribe(throttle(() => {
  saveState({
    auth: store.getState().auth,

  })
  
}, 1000))

ReactDOM.render(
  <Router>
    <Provider store={store}>
      <App />
    </Provider>
  </Router>, 
    document.getElementById('root')
);

serviceWorker.unregister();

