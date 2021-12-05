import { useContext, useCallback } from 'react'
import { toast } from 'react-toastify'
import { Manager } from 'socket.io-client'

import api from '../api/axios'

import { setupContext, Provider } from "./base"

type Restaurant = {
  id: string
  name: string
  photo: string
  address: string
}

type State = {
  restaurants: Restaurant[]
  sessionId: string
  connected: boolean
}

type ActionRestaurants = {
  type: 'SET_RESTAURANTS'
  payload: Restaurant[]
}

type ActionSession = {
  type: 'SET_SESSION_ID'
  payload: string
}

type ActionConnection = {
  type: 'SET_CONNECTED'
  payload: boolean
}

type Action = ActionRestaurants | ActionSession | ActionConnection

const SessionContext = setupContext<State, Action>()

const defaultState: State = {
  restaurants: [],
  sessionId: '',
  connected: false,
}

const reducer = (state: State, action: Action): State => {
  switch (action.type) {
    case 'SET_RESTAURANTS':
      return {
        ...state,
        restaurants: action.payload,
      }
    case 'SET_SESSION_ID':
      return {
        ...state,
        sessionId: action.payload,
      }
    case 'SET_CONNECTED':
      return {
        ...state,
        connected: action.payload,
      }
    default:
      return state
  }
}

export const { ProviderComponent: SessionProvider } = Provider(SessionContext, reducer, defaultState)

const url = process.env.REACT_APP_API_URL

const manager = new Manager(url, {
  path: '/sessionws',
})

const setup = (
  sessionId: string,
  restaurants: Restaurant[],
  cbMatch: (text: string) => void
) => {
  return new Promise<{ sessionId: string, restaurants: Restaurant[] }>((resolve) => {
    const socket = manager.socket('/')
    
    socket.on('connect', () => {
      console.log('received connection status',)
      socket.emit('join', sessionId)
      resolve({ sessionId, restaurants })
    })

    socket.on('match', ({ restaurantId }: any) => {
      // @ts-ignore
      const matched = restaurants.find((r) => {
         return r.id === restaurantId
       })
      if (matched) {
        cbMatch(`${matched!.name} pleases everyone :D`)
      }
    })
  })
}

const matchNotification = (message: string) => toast.success(message, {
  position: "top-center",
  autoClose: 5000,
  hideProgressBar: false,
  closeOnClick: true,
  pauseOnHover: true,
  draggable: true,
  progress: undefined,
})

const useSession = () => {
  const context = useContext(SessionContext)
  if (context === undefined || context === null) {
    throw new Error("useSession must be used within a SessionProvider")
  }

  const { state, dispatch } = context

  const update = useCallback((sessionId: string, restaurants: Restaurant[]) => {
    dispatch({
      type: 'SET_SESSION_ID',
      payload: sessionId,
    })
    dispatch({
      type: 'SET_RESTAURANTS',
      payload: restaurants,
    })
    dispatch({
      type: 'SET_CONNECTED',
      payload: true,
    })
  }, [dispatch])

  const createSession = useCallback(() => {
    if(navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords
          api.post(`session?lat=${latitude}&lng=${longitude}`)
            .then((response) => {
              return setup(response.data.id, response.data.restaurants, matchNotification)
            }).then(({ sessionId, restaurants }) => {
              update(sessionId, restaurants)
            })
        },
        (error) => {
          console.log(error)
        }
      )
    }
  }, [update])

  const joinSession = useCallback((id: string) => {
    api.post(`session/${id}/join`)
      .then((response) => {
        return setup(response.data.id, response.data.restaurants, matchNotification)
      }).then(({ sessionId, restaurants }) => {
        update(sessionId, restaurants)
      }).catch(error => {
        toast.error('Wrong code')
      })
  }, [update])

  const swipe = useCallback((restaurant: Restaurant, like: boolean) => {
    if (like) {
      api.post(`swipe/like/${state.sessionId}/${restaurant.id}`)
    } else {
      api.post('swipe/dislike')
    }
  }, [state])

  return {
    createSession,
    joinSession,
    swipe,
    sessionId: state.sessionId,
    restaurants: state.restaurants,
    connected: state.connected,
  }
}

export default useSession
