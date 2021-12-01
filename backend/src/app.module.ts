import { Module } from '@nestjs/common'
import { AppController } from './app.controller'
import { AppService } from './app.service'
import { HeartbeatController } from './heartbeat/heartbeat.controller'
import { RecipesModule } from './recipes/recipes.module'
import { AuthModule } from './auth/auth.module'
import { UserModule } from './user/user.module'
import { SwipeController } from './swipe/swipe.controller'
import { SwipeService } from './swipe/swipe.service'
import { SessionModule } from './session/session.module'
import { RestaurantService } from './restaurant/restaurant.service'

@Module({
  imports: [RecipesModule, AuthModule, UserModule, SessionModule],
  controllers: [AppController, HeartbeatController, SwipeController],
  providers: [AppService, SwipeService, RestaurantService],
})
export class AppModule {}
