import User from './User.js'
import Exercise from './Exercise.js'
import Routine from './Routine.js'
import RoutineExercise from './RoutineExercise.js'

User.hasMany(Exercise, { foreignKey: 'createdBy', as: 'exercises' })
Exercise.belongsTo(User, { foreignKey: 'createdBy', as: 'creator' })

User.hasMany(Routine, { foreignKey: 'userId', as: 'routines' })
Routine.belongsTo(User, { foreignKey: 'userId', as: 'owner' })

Routine.hasMany(RoutineExercise, { foreignKey: 'routineId', as: 'exercises' })
RoutineExercise.belongsTo(Routine, { foreignKey: 'routineId', as: 'routine' })

Exercise.hasMany(RoutineExercise, { foreignKey: 'exerciseId', as: 'routineExercises' })
RoutineExercise.belongsTo(Exercise, { foreignKey: 'exerciseId', as: 'exercise' })