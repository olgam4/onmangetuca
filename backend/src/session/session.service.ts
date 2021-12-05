import { Inject, Injectable } from '@nestjs/common'
import { EventEmitter2 } from '@nestjs/event-emitter'
import { User } from 'src/user/user.entity'
import { Restaurant } from './domain/restaurant'
import { RestaurantFinder } from './domain/restaurant-finder'
import { Session } from './domain/session.entity'
import { SessionRepository } from './domain/session.repository'

type ReturnType = {
  restaurants: Restaurant[]
  id: string
}

@Injectable()
export class SessionService {
  constructor(
    @Inject('RestaurantFinder')
    private readonly restaurantFinder: RestaurantFinder,
    @Inject('SessionRepository')
    private readonly sessionRepository: SessionRepository,
    private readonly eventEmitter: EventEmitter2,
  ) {}

  async create(user: User, lat: number, lng: number): Promise<ReturnType> {
    const session = new Session()
    console.log(`${user.username} created a session with id ${session.id}`)
    session.restaurants = await this.restaurantFinder.find(lat, lng)
    this.sessionRepository.save(session)
    return {
      id: session.id,
      restaurants: session.restaurants,
    }
  }

  async join(user: User, id: string): Promise<ReturnType> {
    const session = await this.sessionRepository.findBySessionId(id)
    console.log(`${user.username} joined ${id}`)
    this.sessionRepository.save(session)
    return {
      id: session.id,
      restaurants: session.restaurants,
    }
  }

  async like(
    sessionId: string,
    restaurantId: string,
  ) {
    const session = await this.sessionRepository.findBySessionId(sessionId)
    session.addLike(restaurantId, () =>
      this.eventEmitter.emit('match', { restaurantId, sessionId }),
    )
  }

  async getSession(id: string): Promise<Session> {
    return this.sessionRepository.findBySessionId(id)
  }
}
