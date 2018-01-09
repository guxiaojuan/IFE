import React from 'react'
import ReactDOM from 'react-dom'
import store from './redux/store'
import App from './containers/Header.jsx'
import {Provider} from 'react-redux'

ReactDOM.render(
    <Provider store={store}>
        <App />
    </Provider>,
    document.getElementById('app')
)