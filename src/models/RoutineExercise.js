import { DataTypes } from 'sequelize'
import { sequelize } from '../config/database.js'

const RoutineExercise = sequelize.define('RoutineExercise', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  order: {
    type: DataTypes.INTEGER,
    allowNull: false,
    defaultValue: 0
  },
  sets: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  reps: {
    type: DataTypes.STRING,
    allowNull: false
  },
  weight: {
    type: DataTypes.FLOAT,
    allowNull: true
  }
}, {
  timestamps: true
})

export default RoutineExercise
