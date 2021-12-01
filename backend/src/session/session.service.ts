import { Inject, Injectable } from '@nestjs/common'
import { Restaurant } from './domain/restaurant'
import { RestaurantFinder } from './domain/restaurant-finder'

@Injectable()
export class SessionService {
  constructor(
    @Inject('RestaurantFinder')
    private readonly restaurantFinder: RestaurantFinder,
  ) {}

  async create(): Promise<Restaurant[]> {
    return this.restaurantFinder.find()
  }
}
