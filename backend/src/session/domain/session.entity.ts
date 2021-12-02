export class Session {
  id: string
  likes: Map<string, string[]>

  constructor() {
    this.id = 'string'
    this.likes = new Map()
  }

  addLike(username: string, restaurant: string, callback: () => void) {
    this.verifyIfMatch(restaurant, callback)
    if (!this.likes.has(username)) {
      this.likes.set(username, [restaurant])
    } else {
      this.likes.get(username).push(restaurant)
    }
  }

  join(username: string) {
    if (!this.likes.has(username)) {
      this.likes.set(username, [])
      console.log(`${username} joined the session`)
    }
  }

  private verifyIfMatch(restaurant: string, callback: () => void) {
    const likes = this.likes.values()
    const likesFlat = [].concat(...likes)
    console.log(restaurant)
    console.log(likesFlat)
    likesFlat.forEach(likedRestaurant => {
      if (likedRestaurant === restaurant) {
        callback()
        console.log('MATCH FOUND FOR', restaurant)
        return
      }
    })
  }
}
