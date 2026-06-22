import { Router } from 'express'
import { register, login } from '../controllers/authController.js'
import { authenticate } from '../middlewares/auth.js'


const router = Router()

router.post('/register', register)
router.post('/login', login)

// Ruta para probar que el token funciona
router.get('/me', authenticate, (req, res) => {
    res.json({ user: req.user })
})
export default router