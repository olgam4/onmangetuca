import { Inject, Injectable } from '@nestjs/common'

import { Restaurant } from '../domain/restaurant'
import { RestaurantFinder } from '../domain/restaurant-finder'

@Injectable()
export class PlacesAPIRestaurantFinder implements RestaurantFinder {
  constructor(
    @Inject('Places') private readonly placesClient: any,
    @Inject('Photos') private readonly photosClient: any,
  ) {}

  find(lat: number, lng: number): Promise<Restaurant[]> {
    return this.getRestaurants(lat, lng)
  }

  private async getRestaurants(lat: number, lng: number): Promise<any> {
    const { data } = await this.placesClient({
      method: 'get',
      url:
        `/json?` +
        `location=${lat}%2C${lng}` +
        `&radius=20000` +
        `&type=restaurant` +
        `&key=${process.env.PLACES_API}`,
    })
    const restaurants = data.results.map((restaurant) => {
      const r = new Restaurant(
        restaurant.place_id,
        restaurant.name,
        restaurant.vicinity,
      )
      return {
        ...r,
        photos: restaurant.photos[0].photo_reference,
      }
    })
    const photosPromises = restaurants.map(async (r) => {
      return new Promise(async (resolve) => {
        const result = await this.photosClient({
          method: 'get',
          url:
            `/photo?photo_reference` +
            `=${r.photos}` +
            `&maxheight=800` +
            `&key=${process.env.PLACES_API}`,
        })
        resolve({
          ...r,
          photo: result.request._redirectable._options.href,
        })
      })
    })
    const restaurantsWithPhotos = await Promise.all(photosPromises)
    return restaurantsWithPhotos
  }
}
