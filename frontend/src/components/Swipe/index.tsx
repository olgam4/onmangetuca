import { useEffect, useRef } from 'react'
import Card from 'react-tinder-card'
import { toast } from 'react-toastify'
import { Manager } from 'socket.io-client'

import { useSession } from './hooks'

import style from './style.module.css'

const url = process.env.REACT_APP_API_URL

const manager = new Manager(url, {
  path: '/session',
})
const newSocket = manager.socket('/')

const setup = (restaurants: any, cb: any) => {
  newSocket.removeListener('msgToClient')
  newSocket.on('msgToClient', ({ event, data }) => {
    if (event === 'match') {
      // @ts-ignore
      const matched = restaurants.find((r) => r.id === parseInt(data.restaurantId, 10))
      if (matched) {
        cb(`${matched!.name} pleases everyone :D`)
      }
    }
  })
}

const Swipe = () => {
  const { swipe, restaurants } = useSession()

  const ref = useRef(null)

  const matchNotification = (message: string) => toast.success(message, {
    position: "top-center",
    autoClose: 5000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
  })

  useEffect(() => {
    setup(restaurants, matchNotification)
  }, [restaurants])

  const ping = () => {
    if (newSocket) {
      newSocket.emit('msgToServer', 'ping')
    }
  }

  const yes = () => {
    // @ts-ignore
    ref.current?.swipe('right')
  }

  const no = () => {
    // @ts-ignore
    ref.current?.swipe('left')
  }

  const onSwipe = (direction: string, index: number) => {
    if (direction === 'right') {
      swipe(restaurants[index], true)
    } else {
      swipe(restaurants[index], false)
    }
  }

  const both = (photo: string) => {
    const linearGradient = `linear-gradient(to top, rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0) 18%)`
    const backgroundImage = `url(${photo})`
    return `${linearGradient}, ${backgroundImage}`
  }

  return (
    <div className={style.session}>
      <div className={style.cardContainer}>
        {restaurants.map((restaurant, index) => (
          <Card
            ref={ref}
            className="swipe"
            preventSwipe={['up', 'down']}
            onSwipe={(direction) => onSwipe(direction, index)}
            key={index}
          >
            <div 
              className={style.card}
              style={{ backgroundImage: both(restaurant.photo) }}
            >
              <h3>{restaurant.name}</h3>
            </div>
          </Card>
        ))}
      </div>
      <div>
        <button disabled onClick={no}>No</button>
        <button disabled onClick={yes}>Yes</button>
        <button onClick={ping}>Ping</button>
      </div>
    </div>
  )
}

export default Swipe
