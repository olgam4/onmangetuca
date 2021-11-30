import { Body, Controller, Get, Post, Response } from '@nestjs/common'
import { AppService } from './app.service'
import { AuthService } from './auth/auth.service'

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    private readonly authService: AuthService,
  ) {}

  @Get()
  getHello(): string {
    return this.appService.getHello()
  }

  @Post('auth/login')
  async login(@Body() req: any, @Response() res: any) {
    const logged = await this.authService.login(req.user)
    if (logged === null) {
      return res.status(401).send('Invalid credz')
    } else {
      return res.status(200).send(logged)
    }
  }
}
