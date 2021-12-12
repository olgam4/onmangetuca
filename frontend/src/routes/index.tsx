import { NavLink } from 'react-router-dom'
import { MdFastfood } from 'react-icons/md'
import { BiFoodMenu } from 'react-icons/bi'
import { Route, Routes, useLocation } from "react-router-dom"
import { CSSTransition, TransitionGroup } from "react-transition-group"

import App from '../App'

import useAuth from 'hooks/useAuth'

import RequireAuth from 'components/RequireAuth'
import Logout from 'components/Logout'

import Login from 'routes/login'
import Recipes from 'routes/recipes'
import Swipe from 'routes/swipe'

const RoutesElement = () => {
  const location = useLocation()
  const { authed } = useAuth()


  const splitLocation = location.pathname.split('/')

  return (
    <>
      <TransitionGroup component={null}>
        <CSSTransition key={location.key} classNames="fade" timeout={300}>
          <Routes>
            <Route path="/" element={<App />}>
              <Route path="swipe" element={
                <RequireAuth>
                  <Swipe />
                </RequireAuth>
                } />
              <Route path="recipes" element={
                <RequireAuth>
                  <Recipes />
                </RequireAuth>
                } />
              <Route path="login" element={<Login />} />
            </Route>
          </Routes>
        </CSSTransition>
      </TransitionGroup>
      <nav className={`${!authed && 'invisible'}`}>
      {authed &&
        <>
          <Logout/>
          <NavLink to="/swipe">
            <div className={`navIcon ${splitLocation[1] === 'swipe' && 'active'}`}>
              <MdFastfood size="30px"/>
            </div>
          </NavLink>
          <NavLink to="/recipes">
            <div className={`navIcon ${splitLocation[1] === 'recipes' && 'active'}`}>
              <BiFoodMenu size="30px" />
            </div>
          </NavLink>
        </>
      }
      </nav>
    </>
  )
}

export default RoutesElement
