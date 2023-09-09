import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { Provider } from 'react-redux'
import {persistor, store} from './redux/store'
import { PersistGate } from 'redux-persist/integration/react'
import Admin from './Admin.jsx'

const isAdminRoute = window.location.pathname.startsWith('/admin');


ReactDOM.createRoot(document.getElementById('root')).render(
  
  <React.StrictMode>
    <Provider store={store}>
    <PersistGate  persistor={persistor} >
           {isAdminRoute ? <Admin /> : <App />}
    </PersistGate>
  </Provider>
  </React.StrictMode>,
)
