import { useEffect, useState } from 'react'
import instance from '../api/axios'

interface Recipe {
  name: string
}

const useRecipesApi = () => {
  const baseRecipes: Recipe[] = []
  const [recipes, setRecipes] = useState(baseRecipes)

  useEffect(() => {
    instance.get(`/recipes`)
      .then((response) => {
        setRecipes(response.data.recipes)
      })
  }, [setRecipes])

  const addRecipe = (recipe: Recipe) => {
    instance.post(`/recipes`, recipe)
      .then(() => {
        setRecipes([...recipes, recipe])
      })
  }

  return {
    recipes: recipes as Recipe[],
    addRecipe
  }
}

export default useRecipesApi
