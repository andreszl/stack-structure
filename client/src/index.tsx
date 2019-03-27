import React from 'react'
import { hydrate } from 'react-dom'
import App from './components/app.component'
import { BrowserRouter as Router } from 'react-router-dom'

import { Provider }  from 'react-redux'
import { createStore } from 'redux'
import reducers from './reducers'

const store = createStore(reducers)


declare global {
    interface Window { __INITIAL_STATE__: any; }
}


hydrate(  
    <Provider store={store}>
        <Router>  
            <App initialState={window.__INITIAL_STATE__} />
        </Router>
    </Provider>,
    document.getElementById('app')
);

