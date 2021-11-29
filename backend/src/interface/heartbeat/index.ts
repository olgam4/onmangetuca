import express from 'express'

const router = express.Router()

router.get('/', (_, res) => {
  const now = new Date()
  res.send(now.toString())
})

export default router
