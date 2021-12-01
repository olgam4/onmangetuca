import { useCallback, useEffect, useState } from 'react'
import instance from '../api/axios'

type Recipe = {
  name: string
  description: string
}

type Callback = () => void

const useRecipesApi = () => {
  const baseRecipes: Recipe[] = []
  const [recipes, setRecipes] = useState(baseRecipes)

  useEffect(() => {
    instance.get(`/recipes`)
      .then((response) => {
        setRecipes(response.data.recipes)
      })
  }, [setRecipes])

  const addRecipe = useCallback((recipe: Recipe, cb: Callback) => {
    instance.post(`/recipes`, recipe)
      .then(() => {
        setRecipes([...recipes, recipe])
      })
      .catch(() => {
        cb()
      })
  }, [recipes])

  return {
    recipes: recipes as Recipe[],
    addRecipe
  }
}

export default useRecipesApi
