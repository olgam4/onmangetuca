import { Session } from './session.entity'

export interface SessionRepository {
  findBySessionId(sessionId: string): Promise<Session>
  save(session: Session): Promise<void>
}
