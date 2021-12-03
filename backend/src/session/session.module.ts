import { Module } from '@nestjs/common'
import { OpenSourceRestaurantFinder } from './infra/opensource-restaurant-finder'
import { SessionController } from './session.controller'
import { SessionService } from './session.service'

import * as Nominatim from 'nominatim-client'
import * as Pexels from 'pexels'

@Module({
  controllers: [SessionController],
  providers: [
    SessionService,
    {
      provide: 'RestaurantFinder',
      useClass: OpenSourceRestaurantFinder,
    },
    {
      provide: 'Pexels',
      useFactory: () => {
        return Pexels.createClient(
          process.env.PEXELS_API,
        )
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
  exports: [SessionService]
})
export class SessionModule {}
