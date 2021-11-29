import dotenv from 'dotenv'
import express from 'express'

dotenv.config({
  path: `.env`
})

class Server {
  public app = express()

  constructor() {
    this.app.get('/heartbeat', (_, res) => {
      const now: Date = new Date()
      res.send(`${now.toString()}`)
    })
  }
}

const server = new Server()

;((port = process.env.APP_PORT || 5000) => {
  server.app.listen(port, () => {
    console.log(`> Listening on port ${port} 🎉`)
  })
})()
