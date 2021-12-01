import { BiLogOut } from 'react-icons/bi'

import useAuth from 'hooks/useAuth'
import useUser from 'hooks/useUser'

const Logout = () => {
  const { logout: logoutAuth } = useAuth()
  const { logout } = useUser()

  const handleLogout = () => {
    logoutAuth()
    logout()
  }

  return (
    <div style={{ flex: 0 }} className="navIcon" onClick={handleLogout}>
      <BiLogOut size="30px" color="red" />
    </div>
  )
}

export default Logout
