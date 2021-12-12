import { useRef, useState } from 'react'
import { BsArrowRight, BsArrowRightCircle } from 'react-icons/bs'
import Card from 'react-tinder-card'
import { toast } from 'react-toastify'

import useSession from '../../hooks/useSession'

import style from './style.module.css'

const CreateSession = () => {
  const { createSession } = useSession()
  
  return (
    <div className={style.create}>
      <button
        onClick={createSession}
      >
        Create
        <div />
        <BsArrowRight />
      </button>
    </div>
  )
}

const JoinSesion = () => {
  const { joinSession } = useSession()
  const [code, setCode] = useState('a9ot8')

  const handleChange = (e: any) => {
    setCode(e.target.value)
  }
  
  const handleJoining = (e: React.FormEvent) => {
    e.preventDefault()
    if (code.length === 0) {
      toast.error('Please enter a code')
      return
    }
    joinSession(code)
  }

  return (
    <div className={style.join}>
      <form onSubmit={handleJoining}>
        <label>
          Code
          <input
            className={style.joinSessionInput}
            type="text"
            value={code}
            onChange={handleChange}
          />
        </label>
        <button type="submit" ><BsArrowRightCircle size="40px" color="white" /></button>
      </form>
    </div>
  )
}

const Swipe = () => {
  const { loading, connected, restaurants, sessionId, swipe } = useSession()

  const ref = useRef(null)

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
    const linearGradient = `linear-gradient(to top, rgba(0, 0, 0, 1), rgba(0, 0, 0, 0) 22%)`
    const backgroundImage = `url(${photo})`
    return `${linearGradient}, ${backgroundImage}`
  }

  return loading ?
    (
      <div className={style.session}>
        {
          !connected && (
            <div className={style.cardContainer}>
              <div className={style.cardLoading}>
                <div className={style.loading} />
              </div>
            </div>
          )
        }
        <div className={style.cardContainer}>
          {restaurants.map((restaurant, index) => {
            return (
            <Card
              className="swipe"
              preventSwipe={['up', 'down']}
              onSwipe={(direction) => onSwipe(direction, index)}
              key={restaurant.id}
            >
              <div 
                className={style.card}
                style={{ backgroundImage: both(restaurant.photo) }}
              >
                <h3>{restaurant.name}</h3>
                <p>{restaurant.address}</p>
              </div>
            </Card>
          )})}
        </div>
        <div className={style.info}>
          <div>{sessionId}</div>
        </div>
      </div>
    ) :
    (
      <div className={style.sessions}>
        <CreateSession />
        <JoinSesion />
      </div>
    )
}

export default Swipe
