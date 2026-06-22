import express, { json } from 'express'
import 'dotenv/config'
import {connectDB} from './config/database.js'
import './models/User.js'
import authRoutes from './routes/authRoutes.js'

const app = express()
app.use(json())


app.use('/api/auth', authRoutes)


const PORT = process.env.PORT || 1234

connectDB()


app.listen(PORT, () =>{
    console.log(`server listen on port http://localhost:${PORT}`)
})