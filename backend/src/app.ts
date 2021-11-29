import setup from '@src/context/inversify.config'

import dotenv from 'dotenv'
import Server from '@src/Server'
import IRecipeRepository, { IRecipeRepositoryType } from './domain/IRecipeRepository'
import AppService from './appService/recipe/appService'

dotenv.config({
  path: `.env`
})

const container = setup()

const server = new Server()

console.log(container.get<IRecipeRepository>(IRecipeRepositoryType))
const test = new AppService()
console.log(test.all)

;((port = process.env.APP_PORT || 5000) => {
  server.app.listen(port, () => {
    console.log(`> Listening on port ${port} 🎉`)
  })
})()
