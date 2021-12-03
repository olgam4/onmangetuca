import { useState } from "react"
import { useLocation, useNavigate } from 'react-router-dom'
import { toast } from "react-toastify"

import useUser from "hooks/useUser"
import useAuth from "hooks/useAuth"

import style from "./style.module.css"

const Login = () => {
  const { login } = useUser()
  const { login: loginAuth } = useAuth()
  const [username, setUsername] = useState('a')
  const [password, setPassword] = useState('a')
  const location = useLocation()
  const navigate = useNavigate()

  const handleChangePassword = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(event.target.value)
  }

  const handleChangeUsername = (event: React.ChangeEvent<HTMLInputElement>) => {
    setUsername(event.target.value)
  }

  const loginError = () => toast.error('Woops...', {
    position: "top-center",
    autoClose: 5000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
  })

  const loginSuccess = () => {
    setPassword('')
    setUsername('')
    const from = location.state?.from === '/login' ? '/' : location.state?.from || '/'

    loginAuth()
    navigate(from)
  }

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const userPayload = {
      user: {
        username,
        password
      }
    }

    login(userPayload, loginSuccess, loginError)
  }

  return (
    <form onSubmit={handleSubmit} className={style.loginForm} >
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
      <button type="submit" >Login</button>
    </form>
  )
}

export default Login
