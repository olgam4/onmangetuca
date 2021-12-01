import { Inject, Injectable } from '@nestjs/common'

import { Restaurant } from '../domain/restaurant'
import { RestaurantFinder } from '../domain/restaurant-finder'

@Injectable()
export class OpenSourceRestaurantFinder implements RestaurantFinder {
  constructor(@Inject('Nominatim') private readonly nominatimClient) {}

  find(): Promise<Restaurant[]> {
    const lat = 46.8010757
    const lng = -71.2453933
    return this.getRestaurants(lat, lng)
  }

  private getRestaurants(lat: number, lng: number): Promise<Restaurant[]> {
    return this.nominatimClient.search({
      q: `${lat} ${lng} restaurant`,
      addressdetails: 1,
    }).then((result) => {
      return result.map((restaurantDto) => ({
        name: restaurantDto.display_name,
      }))
    })
  }
}
