export class Restaurant {
  id: string
  name: string
  address: string
  photo?: string

  constructor(id: string, name: string, address: string) {
    this.id = id
    this.name = name
    this.address = address
  }
}
