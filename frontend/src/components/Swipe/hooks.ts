import { useCallback, useEffect, useState } from 'react'
import api from '../../api/axios'

type Restaurant = {
  name: string
}

export const useSession = () => {
  const [restaurants, setRestaurants] = useState<Restaurant[]>([])

  useEffect(() => {
    api.post('session')
      .then((response) => {
      setRestaurants(response.data)
    })
  }, [setRestaurants])

  const swipe = useCallback((restaurant: Restaurant, like: boolean) => {
    if (like) {
      api.post('swipe/like', { restaurant })
    } else {
      api.post('swipe/dislike', { restaurant })
    }
  }, [setRestaurants])

  return {
    restaurants,
    swipe
  }

}
