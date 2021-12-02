import { useCallback, useEffect, useState } from 'react'
import api from '../../api/axios'

type Restaurant = {
  name: string
  id: string
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
      console.log('like', restaurant.id)
      api.post(`swipe/like/${restaurant.id}`)
    } else {
      api.post('swipe/dislike')
    }
  }, [])

  return {
    restaurants,
    swipe
  }

}
