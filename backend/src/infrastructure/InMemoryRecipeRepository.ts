import { injectable } from 'inversify'

import IRecipeRepository from '@src/domain/IRecipeRepository'
import Recipe from '@src/domain/recipe'

@injectable()
class InMemoryRecipeRepository implements IRecipeRepository {
  private recipes: Map<Number, Recipe> = new Map()
  private counter = 0

  public add(recipe: any) {
    this.recipes.set(this.counter++, recipe)
  }

  public getAll(): Recipe[] {
    return Array.from(this.recipes.values())
  }
}

export default InMemoryRecipeRepository
