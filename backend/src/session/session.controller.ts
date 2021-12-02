import { Controller, Get, Param, Post, Request, UseGuards } from '@nestjs/common'
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard'
import { SessionService } from './session.service'

@Controller('session')
export class SessionController {
  constructor(private readonly sessionService: SessionService) {}

  @UseGuards(JwtAuthGuard)
  @Post()
  async create(@Request() req: any): Promise<any> {
    return this.sessionService.create(req.user)
  }

  @UseGuards(JwtAuthGuard)
  @Post('join/:id')
  async join(@Param('id') id: string, @Request() req: any): Promise<any> {
    return this.sessionService.join(req.user, id)
  }

  @UseGuards(JwtAuthGuard)
  @Get()
  async get(@Request() req: any): Promise<any> {
    const session = await this.sessionService.getSession(req.user)
    console.log('getting session', session)
    return {
      session: Array.from(session.likes).map(([key, value]) => {
        return {
          name: key,
          likes: value,
        }
      })
    }
  }
}
