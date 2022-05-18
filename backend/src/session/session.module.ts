import { Module } from '@nestjs/common'
import { SessionController } from './session.controller'
import { SessionService } from './session.service'
import { OpenSourceRestaurantFinder } from './infra/opensource-restaurant-finder'
import { PlacesAPIRestaurantFinder } from './infra/places-api-restaurant-finder'
import { InMemorySessionRepository } from './infra/in-memory.session.repository'

import * as Nominatim from 'nominatim-client'
import * as Pexels from 'pexels'
import axios from 'axios'

@Module({
  controllers: [SessionController],
  providers: [
    SessionService,
    {
      provide: 'RestaurantFinder',
      useClass:
          OpenSourceRestaurantFinder
    },
    {
      provide: 'SessionRepository',
      useClass: InMemorySessionRepository,
    },
    {
      provide: 'Pexels',
      useFactory: () => {
        return Pexels.createClient(process.env.PEXELS_API)
      },
    },
    {
      provide: 'Photos',
      useFactory: () => {
        return axios.create({
          baseURL: 'https://maps.googleapis.com/maps/api/place',
          timeout: 5000,
        })
      },
    },
    {
      provide: 'Places',
      useFactory: () => {
        return axios.create({
          baseURL: 'https://maps.googleapis.com/maps/api/place/nearbysearch',
          timeout: 5000,
        })
      },
    },
    {
      provide: 'Nominatim',
      useFactory: () => {
        return Nominatim.createClient({
          useragent: 'restaurant-finder',
          referer: 'https://localhost:3000',
        })
      },
    },
  ],
  exports: [SessionService],
})
export class SessionModule {}
