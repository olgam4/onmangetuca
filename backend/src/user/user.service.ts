import { Injectable } from '@nestjs/common'
import { User } from './user.entity'

@Injectable()
export class UserService {
  private readonly users: User[] = []

  constructor() {
    this.users.push({
      id: 1,
      username: 'oli',
      password: 'motdepassedissile',
    })
    this.users.push({
      id: 2,
      username: 'jeanne',
      password: 'motdepassedissile',
    })
  }

  async findOne(username: string): Promise<User | undefined> {
    return this.users.find((user) => user.username === username)
  }
}
