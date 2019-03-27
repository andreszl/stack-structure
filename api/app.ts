import React from 'react'
import { renderToString } from 'react-dom/server'
import { StaticRouter  } from 'react-router-dom'
import App from '../client/src/components/app.component'


const isDev = (process.env.NODE_ENV !== 'production')

export function handleRender(req, res) {

        let initialState = {"data": "data"}
        let props = { location: req.url, context:{} }

        console.log(props)
        const html  = renderToString(
                React.createElement(StaticRouter, props, React.createElement(App, initialState))                      
        );
        
        res.render('index', { html: html, initialState: JSON.stringify(initialState)})
}