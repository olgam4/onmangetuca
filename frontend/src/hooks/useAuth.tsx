import { useContext, useCallback } from 'react'
import { setupContext, Provider } from "./base"

type State = {
  authed: boolean
  login: () => void
  logout: () => void
}

type Action = {
  type: 'LOGIN' | 'LOGOUT'
}

const AuthContext = setupContext<State, Action>()

const defaultState: State = {
  authed: false,
  login: () => ({}),
  logout: () => ({}),
}

const reducer = (state: State, action: Action): State => {
  switch (action.type) {
    case "LOGIN":
      return { ...state,  authed: true }
    case "LOGOUT":
      return { ...state,  authed: false }
    default:
      return state
  }
}

export const { ProviderComponent: AuthProvider } = Provider(AuthContext, reducer, defaultState)

const useAuth = () => {
  const context = useContext(AuthContext)
  if (context === undefined || context === null) {
    throw new Error("usAuth must be used within a AuthProvider")
  }

  const setAuthed = useCallback((login: boolean) => {
    if (login) {
      context.dispatch({ type: "LOGIN" })
    } else {
      context.dispatch({ type: "LOGOUT" })
    }
  }, [context])

  const login = useCallback(() => {
    setAuthed(true)
  }, [setAuthed])

  const logout = useCallback(() => {
    setAuthed(false)
  }, [setAuthed])

  return {
    authed: context.state.authed,
    login,
    logout
  }
}

export default useAuth
