import bcrypt from 'bcrypt'
import  jwt  from 'jsonwebtoken'
import User from '../models/User.js'

export const register = async (req, res, next) => {
    try {
        const { username, email, password, role } = req.body
        const existingUser = await User.findOne({
                where: { email }
        })

        if (existingUser) {
            return res.status(409).json({ error: 'Email registered try another' })
        }

        const hashedPassword = await bcrypt.hash(password, 10)
        const user = await User.create({
            username,
            email,
            password: hashedPassword,
            role: role || 'user'
        })
        const token = jwt.sign(
            {
                id: user.id,
                username: user.username,
                role: user.role 
            },
            process.env.JWT_SECRET,
            { expiresIn: '7d' }
        )
        res.status(201).json({
            message: 'User create succefull',
            token,
            user: {
                id: user.id,
                username: user.username,
                email: user.email,
                role: user.role
            }
        })
    } catch (error) {
        next(error)
    }
}

export const login = async (req, res, next) => {
    try {
        const { email, password } = req.body
        const user = await User.findOne({ where: { email } })

        if (!user) {
            return res.status(401).json({ error: 'Invalid credentials' })
        }

        const isValidPassword = await bcrypt.compare(password, user.password)
        if (!isValidPassword) {
            return res.status(401).json({ error: 'Invalid credentials' })
        }
        const token = jwt.sign(
            { id: user.id, username: user.username, role: user.role },
            process.env.JWT_SECRET,
            { expiresIn: '7d' }
        )

        res.json({
        message: 'Start seccion succefull',
        token,
        user: {
            id: user.id,
            username: user.username,
            email: user.email,
            role: user.role
        }
        })
    } catch (error) {
        next(error)
    }
}