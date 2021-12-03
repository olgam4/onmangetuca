import { useCallback, useEffect, useState } from 'react'
import api from '../../api/axios'

type Restaurant = {
  name: string
  id: number
  photo: string
  address: string
}

export const useSession = () => {
  const [restaurants, setRestaurants] = useState<Restaurant[]>([])

  useEffect(() => {
    api.post('session')
      .then((response) => {
        console.log(response.data)
        setRestaurants(response.data)
      })
  }, [setRestaurants])

  const swipe = useCallback((restaurant: Restaurant, like: boolean) => {
    if (like) {
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
