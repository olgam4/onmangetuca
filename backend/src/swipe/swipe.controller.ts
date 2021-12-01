import { Controller, Post } from '@nestjs/common';

@Controller('swipe')
export class SwipeController {
  @Post('/like')
  like(): string {
    return 'Hello World!';
  }

  @Post('dislike')
  dislike(): string {
    return 'Hello World!';
  }
}
