import useLogin from "hooks/useLogin"
import { useState } from "react"
import { toast } from "react-toastify"

const Login = () => {
  const { login } = useLogin()
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const handleChangePassword = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(event.target.value)
  }

  const handleChangeUsername = (event: React.ChangeEvent<HTMLInputElement>) => {
    setUsername(event.target.value)
  }

  const loginError = () => toast.error('Woops...', {
    position: "bottom-center",
    autoClose: 5000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
  })

  const handleClick = () => {
    const user = {
      user: {
        username,
        password
      }
    }
    login(user, loginError)
  }

  return (
    <div>
      <h1>Login</h1>
      <label>
        Username:
        <input type="text" value={username} onChange={handleChangeUsername} />
      </label>
      <br />
      <label>
        Password:
        <input type="password" value={password} onChange={handleChangePassword} />
      </label>
      <br />
      <button onClick={handleClick}>Login</button>
    </div>
  )

}

export default Login
