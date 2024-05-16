import React from 'react'
import {HashRouter} from "react-router-dom"
import ReactDOM from 'react-dom/client'
import {App} from './App'
import 'bootstrap/dist/css/bootstrap.min.css';
import './css/index.css'
import { UserProvider } from './components/UserContext';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    
    <UserProvider>
    <App />
    </UserProvider>
    
  </React.StrictMode>,
)
