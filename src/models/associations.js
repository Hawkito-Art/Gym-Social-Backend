import User from './User.js'
import Exercise from './Exercise.js'

User.hasMany(Exercise, { foreignKey: 'createdBy', as: 'exercises' })
Exercise.belongsTo(User, { foreignKey: 'createdBy', as: 'creator' })