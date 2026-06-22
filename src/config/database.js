import { Sequelize } from "sequelize"
import {fileURLToPath} from "url"
import { dirname, join } from "path"

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

const dbPath = process.env.NODE_ENV === 'test'
    ? ':memory:'
    : join(__dirname, '../../database.sqlite')

export const sequelize = new Sequelize({
    dialect: "sqlite",
    storage: dbPath,
    logging: false
})



export const connectDB = async () => {
    try {
        await sequelize.authenticate()
        await sequelize.sync()
        console.log("SQLite has been connected successfully.")
    } catch (error) {
        console.error("DB connection error", error)
        process.exit(1)
    }
};  