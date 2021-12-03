import { Inject, Injectable } from '@nestjs/common'

import { Restaurant } from '../domain/restaurant'
import { RestaurantFinder } from '../domain/restaurant-finder'

@Injectable()
export class OpenSourceRestaurantFinder implements RestaurantFinder {
  constructor(
    @Inject('Pexels') private readonly pexelsClient: any,
    @Inject('Nominatim') private readonly nominatimClient: any
  ) {}

  find(): Promise<Restaurant[]> {
    const lat = 46.8010757
    const lng = -71.2453933
    return this.getRestaurants(lat, lng)
  }

  private async getRestaurants(lat: number, lng: number): Promise<any> {
    const nomResult = await this.nominatimClient
      .search({
        q: `${lat} ${lng} restaurant`,
        addressdetails: 1,
      })
    const restaurants = nomResult.map((result) => {
      return new Restaurant(
        result.place_id,
        result.address.amenity,
        `${result.address.road}`
      )
    })
    const photosPromises = restaurants.map(async (r) => {
      return new Promise(async (resolve) => {
        const result = await this.pexelsClient.photos.search({
          query: `${r.name}, restaurant`,
          local: 'fr-FR',
          page: 1,
          per_page: 1,
        })
        resolve({
          photo: result.photos[0]?.src.portrait,
          id: r.id,
          name: r.name,
          address: r.address,
        })
      })
    })
    const restaurantsWithPhotos = await Promise.all(photosPromises)
    return restaurantsWithPhotos
  }
}
