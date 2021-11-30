import { Inject, Injectable } from '@nestjs/common'
import { CreateRecipeDto } from './dto/create-recipe.dto'
import { GetRecipesDto } from './dto/get-recipes.dto'
import { RecipeDto } from './dto/recipe.dto'
import { Recipe } from './recipe.entity'
import { RecipeRepository } from './recipe.repository'

const fromDto = (createRecipeDto: CreateRecipeDto) => {
  return new Recipe(createRecipeDto.name)
}

const toDto = (recipe: Recipe) => {
  return new RecipeDto(recipe.name)
}

@Injectable()
export class RecipesService {
  constructor(
    @Inject('RecipeRepository') private recipesRepository: RecipeRepository,
  ) {}

  create(createRecipeDto: CreateRecipeDto) {
    const recipe = fromDto(createRecipeDto)
    return this.recipesRepository.save(recipe)
  }

  async findAll(): Promise<GetRecipesDto> {
    const recipes = await this.recipesRepository.find()
    const recipesDto = recipes.map(toDto)
    return new GetRecipesDto(recipesDto)
  }
}
