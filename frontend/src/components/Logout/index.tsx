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
    <button type="button" onClick={handleLogout}>
      Logout
    </button>
  )
}

export default Logout
