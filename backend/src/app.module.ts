import { Module } from '@nestjs/common'
import { AppController } from './app.controller'
import { AppService } from './app.service'
import { HeartbeatController } from './heartbeat/heartbeat.controller'
import { RecipesModule } from './recipes/recipes.module'
import { AuthModule } from './auth/auth.module'
import { UserModule } from './user/user.module'
import { SessionModule } from './session/session.module'
import { SwipeModule } from './swipe/swipe.module'
import { SessionGateway } from './session.gateway'
import { EventEmitterModule } from '@nestjs/event-emitter'

@Module({
  imports: [
    RecipesModule,
    AuthModule,
    UserModule,
    SessionModule,
    SwipeModule,
    EventEmitterModule.forRoot(),
  ],
  controllers: [AppController, HeartbeatController],
  providers: [AppService, SessionGateway],
})
export class AppModule {}
