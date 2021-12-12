import { BiLogOut } from 'react-icons/bi'

import useAuth from 'hooks/useAuth'
import useUser from 'hooks/useUser'
import { useNavigate } from 'react-router-dom'
import { useCallback } from 'react'

const Logout = () => {
  const { logout: logoutAuth } = useAuth()
  const navigate = useNavigate()
  const { logout } = useUser()

  const handleLogout = useCallback(() => {
    logoutAuth()
    navigate('/login')
    logout()
  }, [logout, logoutAuth, navigate])

  return (
    <div style={{ width: "50px", display: "flex", justifyContent: "center", cursor: "pointer" }}>
      <div style={{ flex: 0 }} className="navIcon" onClick={handleLogout}>
        <BiLogOut size="30px" />
      </div>
    </div>
  )
}

export default Logout
