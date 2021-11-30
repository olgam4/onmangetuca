import axios from 'axios'
import { useEffect, useState } from 'react'

const instance = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
  headers: {
    'Content-Type': 'application/json'
  },
})

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
