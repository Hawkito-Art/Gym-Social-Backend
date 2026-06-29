import { Router } from 'express'
import { getAll, getById, create, update, remove, addExercise, removeExercise } from '../controllers/routineController.js'
import { authenticate } from '../middlewares/auth.js'
import { validate } from '../middlewares/validate.js'
import { createRoutineSchema, updateRoutineSchema, addExerciseSchema } from '../validators/routineValidator.js'

const router = Router()

router.get('/', authenticate, getAll)
router.get('/:id', authenticate, getById)
router.post('/', authenticate, validate(createRoutineSchema), create)
router.put('/:id', authenticate, validate(updateRoutineSchema), update)
router.delete('/:id', authenticate, remove)

router.post('/:id/exercises', authenticate, validate(addExerciseSchema), addExercise)
router.delete('/:id/exercises/:exerciseId', authenticate, removeExercise)

export default router
