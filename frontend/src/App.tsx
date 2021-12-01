import { useEffect } from 'react'
import { Link, Outlet, useLocation, useNavigate } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'
import { MdFastfood } from 'react-icons/md'
import { BiFoodMenu } from 'react-icons/bi'

import Logout from 'components/Logout'

import useAuth from 'hooks/useAuth'

import 'react-toastify/dist/ReactToastify.css'
import './App.css'

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
          <Link to="/recipes">
            <div className="navIcon">
              <BiFoodMenu size="30px" />
            </div>
          </Link>
          <Link to="/swipe">
            <div className="navIcon">
              <MdFastfood size="30px"/>
            </div>
          </Link>
        </nav>
      )}
      <ToastContainer />
    </div>
  );
}

export default App;
