import React from 'react'
import { render } from 'react-dom'
import App from './components/app.component'
import { BrowserRouter as Router } from 'react-router-dom'
import jwt from 'jsonwebtoken'
import { Provider }  from 'react-redux'
import { createStore, applyMiddleware  } from 'redux'
import reducers from './reducers'
import thunk from "redux-thunk";
import actions from './actions';

declare global {
    interface Window { __INITIAL_STATE__: any; }
}

const initialState = window.__INITIAL_STATE__

delete window.__INITIAL_STATE__

const store = createStore(reducers, initialState, applyMiddleware(thunk))

if(localStorage.token){
    store.dispatch(actions.authActions.setCurrentUser(jwt.decode(localStorage.token)))
}

render(  
    <Provider store={store}>
        <Router>  
            <App />
        </Router>
    </Provider>,
    document.getElementById('app')
);

