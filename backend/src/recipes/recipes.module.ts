import { Module } from '@nestjs/common'
import { InMemoryRecipeRepository } from './infra/in-memory.recipe.repository'
import { RecipesController } from './recipes.controller'
import { RecipesService } from './recipes.service'

@Module({
  controllers: [RecipesController],
  providers: [
    RecipesService,
    {
      provide: 'RecipeRepository',
      useClass: InMemoryRecipeRepository,
    }
  ],
})
export class RecipesModule {}

