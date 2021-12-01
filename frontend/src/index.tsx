import React from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter, Route, Routes } from "react-router-dom"
import './index.css'
import App from './App'
import reportWebVitals from './reportWebVitals'

import { UserProvider } from 'hooks/useUser'
import Login from 'routes/login'
import Recipes from 'routes/recipes'
import RequireAuth from 'components/RequireAuth'
import { AuthProvider } from 'hooks/useAuth'

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <AuthProvider>
        <UserProvider>
          <Routes>
            <Route path="/" element={<App />}>
              <Route path="recipes" element={
                  <RequireAuth>
                    <Recipes />
                  </RequireAuth>
                } />
              <Route path="login" element={<Login />} />
            </Route>
          </Routes>
        </UserProvider>
      </AuthProvider>
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById('root')
)

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals()
