import { Router } from 'express'
import { getAll, getById, create, update, remove } from '../controllers/exerciseController.js'
import { authenticate, authorize } from '../middlewares/auth.js'
import { validate } from '../middlewares/validate.js'
import { createExerciseSchema, updateExerciseSchema } from '../validators/exerciseValidator.js'

const router = Router()

router.get('/', authenticate, getAll)
router.get('/:id', authenticate, getById)
router.post('/', authenticate, validate(createExerciseSchema), create)
router.put('/:id', authenticate, validate(updateExerciseSchema), update)
router.delete('/:id', authenticate, remove)

export default router