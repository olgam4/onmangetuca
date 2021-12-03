import { useEffect, useState } from 'react'
import { useLocation, useNavigate, useOutlet } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'

import useAuth from 'hooks/useAuth'

import 'react-toastify/dist/ReactToastify.css'
import './App.css'

const AnimatedOutlet = () => {
  const thing = useOutlet()
  const [frozenThing] = useState(thing)
  return frozenThing
}

function App() {
  const { authed } = useAuth()
  const navigate = useNavigate()
  const { pathname } = useLocation()

  useEffect(() => {
    if (!authed && pathname === '/') {
      navigate('/login')
    } else if (authed && pathname === '/') {
      navigate('/recipes')
    }
  }, [authed, pathname, navigate])

  return (
    <div className="App">
      <div className="content">
        <AnimatedOutlet />
      </div>
      <ToastContainer />
    </div>
  );
}

export default App;
