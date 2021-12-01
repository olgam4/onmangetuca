import { useContext, useCallback } from 'react'

import instance from '../api/axios'
import { Provider, setupContext } from './base'

type User = {
  name: string
}

type State = {
  user: User | null
}

type ActionLogin = {
  type: "LOGIN"
  payload: User
}

type ActionLogout = {
  type: "LOGOUT"
}

type Action = ActionLogin | ActionLogout

const UserContext = setupContext<State, Action>()

const defaultState: State = {
  user: null
}

const reducer = (state: State, action: Action): State => {
  switch (action.type) {
    case "LOGIN":
      return { ...state, user: action.payload }
    case "LOGOUT":
      return { ...state, user: null }
    default:
      return state
  }
}

export const { ProviderComponent: UserProvider } = Provider(UserContext, reducer, defaultState)

type UserPayload = {
  user: {
    username: string
    password: string
  }
}

type CallBack = () => void

const useUser = () => {
  const context = useContext(UserContext)
  if (context === undefined || context === null) {
    throw new Error("useUser must be used within a UserProvider")
  }

  const login = useCallback((payload: UserPayload, success: CallBack, error: CallBack) => {
    instance.post(`/auth/login`, payload)
      .then((response) => {
        localStorage.setItem('token', response.data['access_token'])
        localStorage.setItem('user', payload.user.username)
      }).then(() => {
        instance.defaults.headers.common['Authorization'] = `Bearer ${localStorage.getItem('token')}`
        context.dispatch({ type: "LOGIN", payload: { name: payload.user.username } })
        success()
      }).catch(() => {
        localStorage.removeItem('token')
        localStorage.setItem('user', payload.user.username)
        instance.defaults.headers.common['Authorization'] = ``
        error()
      })
    }, [context])

  const logout = () => {
    localStorage.removeItem('token')
    instance.defaults.headers.common['Authorization'] = ``
    context.dispatch({ type: "LOGOUT" })
  }

  return {
    logout,
    login,
    user: context.state.user,
  }
}

export default useUser
