import { Injectable } from '@nestjs/common'
import { User } from './user.entity'

@Injectable()
export class UserService {
  private readonly users: User[] = [
    {
      id: 1,
      username: 'jeanne',
      password: 'motdepassedissicile',
    },
    {
      id: 2,
      username: 'a',
      password: 'a',
    },
  ]

  async findOne(username: string): Promise<User | undefined> {
    return this.users.find((user) => user.username === username)
  }
}
