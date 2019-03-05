import * as React from 'react';
import * as ReactDOM from "react-dom";
import App from './components/App'

declare global {
    interface Window { __INITIAL_STATE__: any; }
}

ReactDOM.hydrate(<App initialState={window.__INITIAL_STATE__} />,
    document.getElementById('app')
);