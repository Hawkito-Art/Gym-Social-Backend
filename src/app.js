import express, { json } from 'express'
import 'dotenv/config'
import {connectDB} from './config/database.js'
import './models/User.js'
import authRoutes from './routes/authRoutes.js'
import { logger } from './middlewares/logger.js'
import { errorHandler } from './middlewares/errorHandler.js'

const app = express()
app.use(json())
app.use(logger)


app.use('/api/auth', authRoutes)


const PORT = process.env.PORT || 1234

connectDB()

app.use((req, res) => {
  res.status(404).json({ error: 'Ruta no encontrada' })
})

app.use(errorHandler)

app.listen(PORT, () =>{
    console.log(`server listen on port http://localhost:${PORT}`)
})