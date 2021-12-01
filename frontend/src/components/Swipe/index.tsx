import { useRef } from 'react'
import Card from 'react-tinder-card'
import { useSession } from './hooks'

import style from './style.module.css'

const Swipe = () => {
  const { swipe, restaurants } = useSession()

  const ref = useRef(null)

  const yes = () => {
    // @ts-ignore
    ref.current?.swipe('right')
  }

  const no = () => {
    // @ts-ignore
    ref.current?.swipe('left')
  }

  const onSwipe = (direction: string) => {
    if (direction === 'right') {
      swipe(restaurants[0], true)
    } else {
      swipe(restaurants[1], false)
    }
  }

  return (
    <div className={style.session}>
      <div className={style.cardContainer}>
        {restaurants.map((restaurant, index) => (
          <Card
            ref={ref}
            className="swipe"
            preventSwipe={['up', 'down']}
            onSwipe={onSwipe}
            key={index}
          >
            <div className={style.card}>
              <h3>{restaurant.name}</h3>
            </div>
          </Card>
        ))}
      </div>
      <div>
        <button disabled onClick={no}>No</button>
        <button disabled onClick={yes}>Yes</button>
      </div>
    </div>
  )
}

export default Swipe
