import {
  Controller,
  HttpCode,
  Post,
  UseGuards,
  Param,
} from '@nestjs/common'
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard'
import { SwipeService } from './swipe.service'

@Controller('swipe')
export class SwipeController {
  constructor(private readonly swipeService: SwipeService) {}

  @UseGuards(JwtAuthGuard)
  @HttpCode(200)
  @Post('like/:session/:restaurant')
  like(
    @Param('restaurant') restaurant: string,
    @Param('session') session: string,
  ) {
    return this.swipeService.like(session, restaurant)
  }

  @UseGuards(JwtAuthGuard)
  @HttpCode(200)
  @Post('dislike')
  dislike() {
    return
  }
}
