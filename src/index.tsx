// Import dependencies
import * as React from 'react'
import {render} from 'react-dom'
// Import main App component
import {App} from './components/App'
// Import CSS stylesheet
import './assets/css/app.css'
import {Provider} from "react-redux"
import {rootReducer} from "./reducers"
import {applyMiddleware, createStore} from "redux"
import thunk from "redux-thunk"
import {BrowserRouter as Router} from "react-router-dom"

// Since we are using HtmlWebpackPlugin WITHOUT a template, we should create our own root node in the body element before rendering into it
let root = document.createElement('div')

// Append root div to body
root.id = 'root'
document.body.appendChild(root)

const store = createStore(rootReducer, applyMiddleware(thunk))

// Render the app into the root div
render(<Provider store={store}>
    <Router>
        <App/>
    </Router>
</Provider>, document.getElementById('root'))
