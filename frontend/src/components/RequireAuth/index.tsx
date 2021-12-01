import { ReactElement } from 'react'

import { useLocation, Navigate } from 'react-router-dom'

import useAuth from 'hooks/useAuth'

type Props = {
  children: ReactElement | ReactElement[]
}

const RequireAuth = ({ children }: Props) => {
  const { authed } = useAuth()
  const location = useLocation()

  return authed === true ?
    <>{children}</> :
    <Navigate
      to="/login"
      replace
      state={{ from: location.pathname }}
    />
}

export default RequireAuth
