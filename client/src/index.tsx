import React from 'react'
import { hydrate } from 'react-dom'
import App from './components/app.component'
import { BrowserRouter as Router } from 'react-router-dom'

declare global {
    interface Window { __INITIAL_STATE__: any; }
}


hydrate(  
    <Router>  
        <App initialState={window.__INITIAL_STATE__} />
    </Router>,
    document.getElementById('app')
);

