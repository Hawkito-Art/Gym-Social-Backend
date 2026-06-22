import { beforeAll, afterAll } from 'vitest'
import { sequelize } from '../src/config/database.js'
import '../src/models/User.js'

beforeAll(async () => {
    await sequelize.sync({ force: true })
})
afterAll(async () => {
    await sequelize.close()
})