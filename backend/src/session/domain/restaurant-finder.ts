import { Restaurant } from './restaurant'

export interface RestaurantFinder {
  find(): Promise<Restaurant[]>
}
