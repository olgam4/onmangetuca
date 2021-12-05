import { Restaurant } from './restaurant'

export class Session {
  id: string
  restaurants: Restaurant[]
  likes: Map<string, number>

  constructor() {
    this.id = Math.random().toString(36).substring(2, 7)
    this.likes = new Map()
  }

  addLike(restaurant: string, callback: () => void) {
    if (this.likes.has(restaurant)) {
      callback()
      const numbersOfLike = this.likes.get(restaurant)
      this.likes.set(restaurant, numbersOfLike + 1)
    } else {
      this.likes.set(restaurant, 1)
    }
  }
}
