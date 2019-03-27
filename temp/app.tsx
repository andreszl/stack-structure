import React from 'react'
import { renderToString } from 'react-dom/server'
import { StaticRouter, matchPath } from 'react-router-dom'
import App from '../client/src/components/App'
import routes from '../client/src/routes'


const isDev = (process.env.NODE_ENV !== 'production')

export function handleRender(req, res, next) {

        let initialState = {"data": "data"}
        const context = {};
        const activeRoute : any = routes.find(
                (route) => matchPath(req.url, route)
              ) || {}
        
        const promise = activeRoute.fetchInitialData
                ? activeRoute.fetchInitialData(req.path)
                : Promise.resolve()

        promise.then((data) => {
           const html = renderToString(
                <App initialState={data} />
           )
        console.log(html)
           // console.log(html)
           res.render('index', { html: html, initialState: JSON.stringify(initialState)})
        }).catch(next)
}