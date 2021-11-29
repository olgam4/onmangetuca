import { Router } from 'express'

import RecipeAppService from '@src/appService/recipe/appService'

const recipeRouter = Router()
const appService = new RecipeAppService()
console.log('hello')

recipeRouter.post('/', (req, res) => {
  appService.addRecipe(req.body)
  res.json('created')
})

recipeRouter.get('/', (_, res) => {
  res.json(appService.all)
})

export default recipeRouter

