import React from 'react'
import { renderToString } from 'react-dom/server'
import { StaticRouter  } from 'react-router-dom'
import App from '../client/src/components/app.component'
import { Provider } from 'react-redux'
import { createStore } from 'redux'
import reducers from '../client/src/reducers'

export function handleRender(req, res) {
            
        const  store : any = createStore(reducers)

        const html  = renderToString(
        <Provider store={store}>
                <StaticRouter location={req.url} context={{}}>
                        <App />
                </StaticRouter>
        </Provider>              
        );
        
        res.render('index', { html: html, initialState: JSON.stringify(store.getState())})
}