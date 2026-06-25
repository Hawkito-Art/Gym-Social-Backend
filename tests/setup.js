import { beforeAll, afterAll } from 'vitest'
import { sequelize } from '../src/config/database.js'
import '../src/models/User.js'
import '../src/models/Exercise.js'
import '../src/models/associations.js'

beforeAll(async () => {
    await sequelize.sync({ force: true })
})
afterAll(async () => {
    await sequelize.close()
})