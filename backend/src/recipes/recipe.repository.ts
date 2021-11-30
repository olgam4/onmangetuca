import { Recipe } from './recipe.entity'

export interface RecipeRepository {
  save(recipe: Recipe): Promise<void>
  find(): Promise<Recipe[]>
}
