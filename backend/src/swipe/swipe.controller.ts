import { Controller, HttpCode, Request, Post, UseGuards, Param } from '@nestjs/common'
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard'
import { SwipeService } from './swipe.service'

@Controller('swipe')
export class SwipeController {
  constructor(private readonly swipeService: SwipeService) {}

  @UseGuards(JwtAuthGuard)
  @HttpCode(200)
  @Post('like/:restaurant')
  like(@Param('restaurant') restaurant: string, @Request() req: any) {
    console.log('swipe request')
    return this.swipeService.like(req.user, restaurant)
  }

  @UseGuards(JwtAuthGuard)
  @HttpCode(200)
  @Post('dislike')
  dislike() {
    return
  }
}
