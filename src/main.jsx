import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import {BrowserRouter} from 'react-router-dom'

import { Provider } from 'react-redux';
import { reducers} from './redux/reducers'
import { thunk } from 'redux-thunk';
import { createStore, applyMiddleware, compose} from 'redux';

import { GoogleOAuthProvider } from '@react-oauth/google';

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE_ || compose;
const store = createStore(reducers, {}, composeEnhancers(applyMiddleware(thunk))) 

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Provider store={store}>
    <BrowserRouter>
    <GoogleOAuthProvider clientId={import.meta.env.VITE_GOOGLE_CLIENT_ID}>
        <App />
    </GoogleOAuthProvider>
    </BrowserRouter>
    </Provider>
  </React.StrictMode>,
)
