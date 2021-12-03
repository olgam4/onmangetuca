import { ReactElement, useEffect } from 'react'

import { useLocation, useNavigate } from 'react-router-dom'

import useAuth from 'hooks/useAuth'

type Props = {
  children: ReactElement | ReactElement[]
}

const RequireAuth = ({ children }: Props) => {
  const { authed } = useAuth()
  const location = useLocation()
  const navigate = useNavigate()

  useEffect(() => {
    if (!authed && location.pathname !== '/login') {
      navigate('/login', { state: { from: location.pathname } })
    }
  }, [authed, location, navigate])

  return authed ?
    <>{children}</> :
    null
}

export default RequireAuth
