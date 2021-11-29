class Ingredient {
}

class Instruction {
}

class Recipe {
  private _name: string
  private _description: string
  private _ingredients: Ingredient[]
  private _instructions: Instruction[]

  constructor(name: string) {
    this._name = name
    this._description = ""
    this._ingredients = []
    this._instructions = []
  }

  get name(): string {
    return this._name
  }
}

export default Recipe
