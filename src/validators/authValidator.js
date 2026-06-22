import {z} from 'zod'

export const registerSchema = z.object({
    username: z.string()
    .min(3, 'Username has be at least 3 characters')
    .max(30, 'Username has be at most 30 characters'),
    email: z.string()
    .email('Invalid email format'),
    password: z.string()
    .min(6, 'Password must be at least 6 characters long')
})

export const loginSchema = z.object({
    email: z.string()
    .email('Invalid email format'),
    password: z.string()
    .min(1, 'Password is required')
})