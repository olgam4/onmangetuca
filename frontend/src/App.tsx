import { useEffect } from 'react'
import { Link, Outlet, useLocation, useNavigate } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'

import useAuth from 'hooks/useAuth'

import 'react-toastify/dist/ReactToastify.css'
import './App.css'
import Logout from 'components/Logout'

function App() {
  const { authed } = useAuth()
  const navigate = useNavigate()
  const location = useLocation()

  useEffect(() => {
    if (location.pathname === '/') {
      navigate('/recipes')
    }
  }, [navigate, location])


  return (
    <div className="App">
      <div className="content">
        <Outlet />
      </div>
      {authed && (
        <nav>
          <Logout/>
          <Link to="/recipes">Recipes</Link>
          <Link to="/swipe">Swipe</Link>
        </nav>
      )}
      <ToastContainer />
    </div>
  );
}

export default App;
