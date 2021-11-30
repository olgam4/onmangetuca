import instance from '../api/axios'

type UserPayload = {
  user: {
    username: string
    password: string
  }
}

type CallBack = () => void

const useLogin = () => {
  const login = (payload: UserPayload, cb: CallBack) => {
    instance.post(`/auth/login`, payload)
      .then((response) => {
        localStorage.setItem('token', response.data['access_token'])
      }).then(() => {
        instance.defaults.headers.common['Authorization'] = `Bearer ${localStorage.getItem('token')}`
      }).catch(() => {
        localStorage.removeItem('token')
        cb()
      })
  }

  return {
    login
  }
}

export default useLogin
