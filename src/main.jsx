import React from 'react'
import ReactDOM from 'react-dom/client'
import {App} from './App'
import './css/index.css'
import './css/App.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import { UserProvider } from './components/UserContext';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <UserProvider>
    <App />
    </UserProvider>
  </React.StrictMode>,
)
