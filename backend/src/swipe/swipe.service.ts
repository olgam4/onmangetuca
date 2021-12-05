import { Injectable } from '@nestjs/common'
import { SessionService } from 'src/session/session.service'

@Injectable()
export class SwipeService {
  constructor(private readonly sessionService: SessionService) {}

  like(sessionId: string, targetId: string) {
    this.sessionService.like(sessionId, targetId)
  }
}
