import express, { json } from 'express'
import 'dotenv/config'
import authRoutes from './routes/authRoutes.js'
import { logger } from './middlewares/logger.js'
import { errorHandler } from './middlewares/errorHandler.js'
import exerciseRoutes from './routes/exerciseRoutes.js'

const app = express()
app.use(json())
app.use(logger)


app.use('/api/auth', authRoutes)
app.use('/api/exercises', exerciseRoutes)


app.use((req, res) => {
    res.status(404).json({ error: 'Path not found' })
})

app.use(errorHandler)

export default app

