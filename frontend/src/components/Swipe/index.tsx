import { useRef } from 'react'
import Card from 'react-tinder-card'

import style from './style.module.css'

const Swipe = () => {
  const ref = useRef(null)
  const yes = () => {
    // @ts-ignore
    ref.current?.swipe('right')
  }

  const no = () => {
    // @ts-ignore
    ref.current?.swipe('left')
  }

  return (
    <div>
      <Card
        ref={ref}
        className="swipe"
        preventSwipe={['up', 'down']}
        onSwipe={direction => console.log(`You swiped ${direction}`)}
        flickOnSwipe
      >
        <div className={style.card}>
          <img src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/331810/sample25.jpg" alt="sample25" />
        </div>
      </Card>
      <div>
        <button onClick={no}>No</button>
        <button onClick={yes}>Yes</button>
      </div>
    </div>
  )
}

export default Swipe
