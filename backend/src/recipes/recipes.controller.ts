import { Body, Controller, Get, Post } from '@nestjs/common'
import { CreateRecipeDto } from './dto/create-recipe.dto'
import { RecipesService } from './recipes.service'

@Controller('recipes')
export class RecipesController {
  constructor(private recipesService: RecipesService) {}

  @Post()
  async createRecipe(@Body() recipe: CreateRecipeDto) {
    console.log('> Create a recipe with', recipe)
    return this.recipesService.create(recipe)
  }

  @Get()
  async getAllRecipes() {
    console.log('> Getting all recipes...')
    return this.recipesService.findAll()
  }
}
