import { Controller, Get } from '@nestjs/common'

@Controller('heartbeat')
export class HeartbeatController {
  @Get()
  getHearbeat(): string {
    return new Date().toString()
  }
}
