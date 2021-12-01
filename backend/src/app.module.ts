import { Module } from '@nestjs/common'
import { AppController } from './app.controller'
import { AppService } from './app.service'
import { HeartbeatController } from './heartbeat/heartbeat.controller'
import { RecipesModule } from './recipes/recipes.module'
import { AuthModule } from './auth/auth.module'
import { UserModule } from './user/user.module'
import { SessionModule } from './session/session.module'
import { RestaurantService } from './restaurant/restaurant.service'
import { SwipeModule } from './swipe/swipe.module'

@Module({
  imports: [RecipesModule, AuthModule, UserModule, SessionModule, SwipeModule],
  controllers: [AppController, HeartbeatController],
  providers: [AppService, RestaurantService],
})
export class AppModule {}
