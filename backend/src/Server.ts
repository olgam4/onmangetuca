import express from 'express'

import heartbeatRouter from '@src/interface/heartbeat'
import recipeRouter from '@src/interface/recipe'

class Server {
  public app = express()

  constructor() {
    this.app.use(express.json())
    this.app.use('/heartbeat', heartbeatRouter)
    this.app.use('/recipes', recipeRouter)
  }
}

export default Server
