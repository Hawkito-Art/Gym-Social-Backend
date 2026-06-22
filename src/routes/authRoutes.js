import { Router } from 'express'
import { register, login } from '../controllers/authController.js'
import { authenticate } from '../middlewares/auth.js'
import { validate } from '../middlewares/validate.js'
import { registerSchema, loginSchema } from '../validators/authValidator.js'
import { rateLimiter } from '../middlewares/rateLimiter.js'


const router = Router()

router.post('/register', validate(registerSchema), register)

router.post('/login', rateLimiter({ windowMs: 60 * 1000, max: 3 }), validate(loginSchema), login)

router.get('/me', authenticate, (req, res) => {
    const { id, username, role } = req.user
    res.json({ user: { id, username, role } })
})
export default router