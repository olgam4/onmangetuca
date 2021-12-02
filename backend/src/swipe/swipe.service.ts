import { Injectable } from '@nestjs/common'
import { SessionService } from 'src/session/session.service'
import { User } from 'src/user/user.entity'

@Injectable()
export class SwipeService {
  constructor(private readonly sessionService: SessionService) {}

  like(user: User, targetId: string) {
    this.sessionService.getSession(user)
      .then(() => {
        console.log(user.username, 'liked', targetId)
        return this.sessionService.like(user, targetId)
      })
  }
}
