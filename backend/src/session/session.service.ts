import { Inject, Injectable } from '@nestjs/common'
import { EventEmitter2 } from '@nestjs/event-emitter'
import { User } from 'src/user/user.entity'
import { Restaurant } from './domain/restaurant'
import { RestaurantFinder } from './domain/restaurant-finder'
import { Session } from './domain/session.entity'

@Injectable()
export class SessionService {
  private session: Session
  private id: string

  constructor(
    @Inject('RestaurantFinder')
    private readonly restaurantFinder: RestaurantFinder,
    private readonly eventEmitter: EventEmitter2
  ) {
    console.log('creating a new session service')
    this.session = new Session()
    this.id = Math.random().toString()
  }

  async create(user: User): Promise<Restaurant[]> {
    console.log(`${user.username} created a session with id ${this.id}`)
    this.session.join(user.username)
    return this.restaurantFinder.find()
  }

  async join(user: User, id: string): Promise<Restaurant[]> {
    console.log(`${user.username} joined ${id}`)
    this.session.join(user.username)
    return
  }

  async like(user: User, restaurantId: string): Promise<Restaurant[]> {
    console.log(`${user.username} liked ${restaurantId} in session ${this.id}`)
    this.session.addLike(user.username, restaurantId, () => this.eventEmitter.emit('match', { restaurantId }))
    return
  }

  async getSession(user: User): Promise<Session> {
    return this.session
  }
}
