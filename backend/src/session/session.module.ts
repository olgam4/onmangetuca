import { Module } from '@nestjs/common'
import { OpenSourceRestaurantFinder } from './infra/opensource-restaurant-finder'
import { SessionController } from './session.controller'
import { SessionService } from './session.service'

import * as Nominatim from 'nominatim-client'

@Module({
  controllers: [SessionController],
  providers: [
    SessionService,
    {
      provide: 'RestaurantFinder',
      useClass: OpenSourceRestaurantFinder,
    },
    {
      provide: 'Nominatim',
      useFactory: () => {
        return  Nominatim.createClient({
          useragent: 'restaurant-finder',
          referer: 'https://localhost:3000'
        })
      },
    },
  ],
})
export class SessionModule {}
