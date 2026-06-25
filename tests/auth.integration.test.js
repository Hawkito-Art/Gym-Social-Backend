import { describe, it, expect } from 'vitest'
import request from 'supertest'
import app from '../src/app.js'

describe('POST /api/auth/register', () => {

    it('Would register a user with valid data', async () => {
        const res = await request(app)
        .post('/api/auth/register')
        .send({ username: 'testuser', email: 'test@test.com', password: '123456' })
        expect(res.status).toBe(201)
        expect(res.body).toHaveProperty('token')
        expect(res.body.user).not.toHaveProperty('email')
        expect(res.body.user.role).toBe('user')
    })

    it('Would reject duplicate email', async () => {
        const res = await request(app)
        .post('/api/auth/register')
        .send({ username: 'otro', email: 'test@test.com', password: '123456' })
        expect(res.status).toBe(409)
    })

    it('Would reject invalid data', async () => {
        const res = await request(app)
        .post('/api/auth/register')
        .send({ username: 'ab', email: 'malo', password: '12' })
        expect(res.status).toBe(400)
        expect(res.body.details).toBeDefined()
    })
    })

describe('POST /api/auth/login', () => {

    it('Would login with valid credentials', async () => {
        const res = await request(app)
        .post('/api/auth/login')
        .send({ email: 'test@test.com', password: '123456' })
        expect(res.status).toBe(200)
        expect(res.body).toHaveProperty('token')
        expect(res.body.user).not.toHaveProperty('email')
    })

    it('Would reject invalid credentials', async () => {
        const res = await request(app)
        .post('/api/auth/login')
        .send({ email: 'test@test.com', password: 'wrong' })
        expect(res.status).toBe(401)
    })

    it('Would reject non-existent email', async () => {
        const res = await request(app)
        .post('/api/auth/login')
        .send({ email: 'noexiste@test.com', password: '123456' })
        expect(res.status).toBe(401)
    })
})
    
describe('GET /api/auth/me', () => {

    it('Would reject without token', async () => {
        const res = await request(app).get('/api/auth/me')
        expect(res.status).toBe(401)
    })

    it('Would return the user with a valid token', async () => {
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
    
    it('Would reject invalid token', async () => {
        const res = await request(app)
        .get('/api/auth/me')
        .set('Authorization', 'Bearer token-falso')
        expect(res.status).toBe(401)
    })
})