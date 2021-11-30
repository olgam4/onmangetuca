import { RecipeDto } from "./recipe.dto";

export class GetRecipesDto {
  recipes: RecipeDto[]

  constructor(recipes: RecipeDto[]) {
    this.recipes = recipes;
  }
}
