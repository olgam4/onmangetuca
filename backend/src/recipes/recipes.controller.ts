import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common'
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard'
import { CreateRecipeDto } from './dto/create-recipe.dto'
import { RecipesService } from './recipes.service'

@Controller('recipes')
export class RecipesController {
  constructor(private recipesService: RecipesService) {}

  @UseGuards(JwtAuthGuard)
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
