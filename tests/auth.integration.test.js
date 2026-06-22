import { describe, it, expect } from 'vitest'
import request from 'supertest'
import app from '../src/app.js'

describe('POST /api/auth/register', () => {

    it('debería registrar un usuario con datos válidos', async () => {
        const res = await request(app)
        .post('/api/auth/register')
        .send({ username: 'testuser', email: 'test@test.com', password: '123456' })
        expect(res.status).toBe(201)
        expect(res.body).toHaveProperty('token')
        expect(res.body.user).not.toHaveProperty('email')
        expect(res.body.user.role).toBe('user')
    })

    it('debería rechazar email duplicado', async () => {
        const res = await request(app)
        .post('/api/auth/register')
        .send({ username: 'otro', email: 'test@test.com', password: '123456' })
        expect(res.status).toBe(409)
    })

    it('debería rechazar datos inválidos', async () => {
        const res = await request(app)
        .post('/api/auth/register')
        .send({ username: 'ab', email: 'malo', password: '12' })
        expect(res.status).toBe(400)
        expect(res.body.details).toBeDefined()
    })
    })

describe('POST /api/auth/login', () => {

    it('debería iniciar sesión con credenciales válidas', async () => {
        const res = await request(app)
        .post('/api/auth/login')
        .send({ email: 'test@test.com', password: '123456' })
        expect(res.status).toBe(200)
        expect(res.body).toHaveProperty('token')
        expect(res.body.user).not.toHaveProperty('email')
    })

    it('debería rechazar credenciales inválidas', async () => {
        const res = await request(app)
        .post('/api/auth/login')
        .send({ email: 'test@test.com', password: 'wrong' })
        expect(res.status).toBe(401)
    })

    it('debería rechazar email inexistente', async () => {
        const res = await request(app)
        .post('/api/auth/login')
        .send({ email: 'noexiste@test.com', password: '123456' })
        expect(res.status).toBe(401)
    })
})
    
describe('GET /api/auth/me', () => {

    it('debería rechazar sin token', async () => {
        const res = await request(app).get('/api/auth/me')
        expect(res.status).toBe(401)
    })

    it('debería devolver el usuario con token válido', async () => {
        const loginRes = await request(app)
        .post('/api/auth/login')
        .send({ email: 'test@test.com', password: '123456' })
        const token = loginRes.body.token
        const res = await request(app)
        .get('/api/auth/me')
        .set('Authorization', `Bearer ${token}`)
        expect(res.status).toBe(200)
        expect(res.body.user).toHaveProperty('username')
        expect(res.body.user).not.toHaveProperty('iat')
        expect(res.body.user).not.toHaveProperty('exp')
    })
    
    it('debería rechazar token inválido', async () => {
        const res = await request(app)
        .get('/api/auth/me')
        .set('Authorization', 'Bearer token-falso')
        expect(res.status).toBe(401)
    })
})