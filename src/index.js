import {connectDB} from './config/database.js'
import './models/User.js'
import app from './app.js'

connectDB()

const PORT = process.env.PORT || 1234

app.listen(PORT, () =>{
    console.log(`server listen on port http://localhost:${PORT}`)
})