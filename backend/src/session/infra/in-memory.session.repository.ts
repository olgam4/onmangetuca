import { NotFoundException } from '@nestjs/common'
import { Session } from '../domain/session.entity'
import { SessionRepository } from '../domain/session.repository'

export class InMemorySessionRepository implements SessionRepository {
  private sessions: Map<string, Session> = new Map()

  async findBySessionId(id: string): Promise<Session> {
    const session = this.sessions.get(id)
    if (session === undefined) {
      throw new NotFoundException(`Session with id ${id} not found`)
    }
    return session
  }

  async save(session: Session): Promise<void> {
    this.sessions.set(session.id, session)
  }
}
