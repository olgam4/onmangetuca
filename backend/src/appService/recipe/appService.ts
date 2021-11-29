import { inject } from 'inversify'

import Recipe from '@src/domain/recipe'
import IRecipeRepository, { IRecipeRepositoryType } from '@src/domain/IRecipeRepository'

import { fromJson } from '@src/appService/recipe/assembler'

interface User {
  name: string
}

class AppService {
  private repository: IRecipeRepository

  constructor(
    @inject(IRecipeRepositoryType) repository: IRecipeRepository
  ) {
    this.repository = repository
    console.log('will inject', repository)
  }

  get all(): Recipe[] {
    return this.repository.getAll()
  }

  addRecipe(recipeJSON: User) {
    console.log(this.repository)
    console.log("Adding a new recipe")
    const recipe = fromJson(recipeJSON)
    this.repository.add(recipe)
  }
}

export default AppService
