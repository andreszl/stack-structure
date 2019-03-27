import React from 'react'
import { renderToString } from 'react-dom/server'
import { StaticRouter  } from 'react-router-dom'
import App from '../client/src/components/app.component'
import { Provider } from 'react-redux'
import { createStore } from 'redux'
import reducers from '../client/src/reducers'

export function handleRender(req, res) {

        let initialState = {"data": "data"}
        let props = { location: req.url, context:{} }
        const  store : any = createStore(reducers)
        console.log(store, store.getState())
        const html  = renderToString(
               React.createElement(StaticRouter, props, React.createElement(App, initialState))                     
        );
        
        res.render('index', { html: html, initialState: JSON.stringify(store.getState())})
}