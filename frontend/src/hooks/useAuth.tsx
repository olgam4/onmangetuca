import { useContext, useCallback } from 'react'
import { setupContext, Provider } from "./base"

type State = {
  authed: boolean
  login: () => Promise<void>
  logout: () => Promise<void>
}

type Action = {
  type: 'LOGIN' | 'LOGOUT'
}

const AuthContext = setupContext<State, Action>()

const defaultState: State = {
  authed: false,
  login: () => Promise.resolve(),
  logout: () => Promise.resolve()
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

  return {
    authed: context.state.authed,
    login() {
      return new Promise<void>((res) => {
        setAuthed(true)
        res()
      })
    },
    logout() {
      return new Promise<void>((res) => {
        setAuthed(false)
        res()
      })
    }
  }
}

export default useAuth
