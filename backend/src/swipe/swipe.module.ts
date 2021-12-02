import { Module } from '@nestjs/common'
import { SessionModule } from 'src/session/session.module'
import { SwipeController } from './swipe.controller'
import { SwipeService } from './swipe.service'

@Module({
  imports: [SessionModule],
  controllers: [SwipeController],
  providers: [SwipeService],
})
export class SwipeModule {}
