import { Module } from '@nestjs/common'
import { AppController } from './app.controller'
import { AppService } from './app.service'
import { HeartbeatController } from './heartbeat/heartbeat.controller'
import { RecipesModule } from './recipes/recipes.module'

@Module({
  imports: [RecipesModule],
  controllers: [AppController, HeartbeatController],
  providers: [AppService],
})
export class AppModule {}
