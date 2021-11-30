import { Module } from '@nestjs/common'
import { AppController } from './app.controller'
import { AppService } from './app.service'
import { HeartbeatController } from './heartbeat/heartbeat.controller'
import { RecipesModule } from './recipes/recipes.module'
import { AuthModule } from './auth/auth.module'
import { UserModule } from './user/user.module'

@Module({
  imports: [RecipesModule, AuthModule, UserModule],
  controllers: [AppController, HeartbeatController],
  providers: [AppService],
})
export class AppModule {}
