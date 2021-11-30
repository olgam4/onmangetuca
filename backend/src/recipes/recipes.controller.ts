import { Body, Controller, Get, Post } from '@nestjs/common'
import { CreateRecipeDto } from './dto/create-recipe.dto'
import { RecipesService } from './recipes.service'

@Controller('recipes')
export class RecipesController {
  constructor(private recipesService: RecipesService) {}

  @Post()
  async createRecipe(@Body() recipe: CreateRecipeDto) {
    return this.recipesService.create(recipe)
  }

  @Get()
  async getAllRecipes() {
    return this.recipesService.findAll()
  }
}
