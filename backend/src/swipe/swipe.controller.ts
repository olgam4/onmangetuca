import { Controller, Post, UseGuards } from '@nestjs/common'
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard'

@Controller('swipe')
export class SwipeController {
  @UseGuards(JwtAuthGuard)
  @Post('like')
  like(): string {
    return 'Hello World!'
  }

  @UseGuards(JwtAuthGuard)
  @Post('dislike')
  dislike(): string {
    return 'Hello World!'
  }
}
