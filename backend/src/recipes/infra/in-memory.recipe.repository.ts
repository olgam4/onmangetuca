import { Injectable } from '@nestjs/common'
import { Recipe } from '../recipe.entity'
import { RecipeRepository } from '../recipe.repository'

@Injectable()
export class InMemoryRecipeRepository implements RecipeRepository {
  private recipes: Recipe[] = []

  public async save(recipe: Recipe): Promise<void> {
    this.recipes.push(recipe)
  }

  public async find(): Promise<Recipe[]> {
    return this.recipes
  }
}
