import { Restaurant } from './restaurant'

export interface RestaurantFinder {
  find(lat?: number, lng?: number): Promise<Restaurant[]>
}
