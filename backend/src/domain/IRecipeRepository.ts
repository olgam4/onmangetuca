import Recipe from '@src/domain/recipe'

interface IRecipeRepository {
  add(recipe: Recipe): void
  getAll(): Recipe[]
}

const IRecipeRepositoryType = Symbol.for('IRecipeRepository')

export { IRecipeRepositoryType }
export default IRecipeRepository
