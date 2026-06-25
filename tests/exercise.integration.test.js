import { describe, it, expect } from 'vitest'
import request from 'supertest'
import app from '../src/app.js'

let userToken, trainerToken, exerciseId

describe('POST /api/exercises', () => {
    it('Would create an exercise as a regular user', async () => {
        const registerRes = await request(app)
        .post('/api/auth/register')
        .send({ username: 'user', email: 'user@test.com', password: '123456' })
        userToken = registerRes.body.token
        const res = await request(app)
        .post('/api/exercises')
        .set('Authorization', `Bearer ${userToken}`)
        .send({ name: 'Press banca', description: 'Pecho', muscleGroup: 'Pecho' })
        expect(res.status).toBe(201)
        expect(res.body.isOfficial).toBe(false)
        expect(res.body.name).toBe('Press banca')
        exerciseId = res.body.id
    })

    it('Would reject creation without token', async () => {
        const res = await request(app)
        .post('/api/exercises')
        .send({ name: 'Test', muscleGroup: 'Pecho' })
        expect(res.status).toBe(401)
    })

    it('Would reject invalid data', async () => {
        const res = await request(app)
        .post('/api/exercises')
        .set('Authorization', `Bearer ${userToken}`)
        .send({ name: '', muscleGroup: '' })
        expect(res.status).toBe(400)
        expect(res.body.details).toBeDefined()
    })
})

describe('GET /api/exercises', () => {
    it('Would list own exercises', async () => {
        const res = await request(app)
        .get('/api/exercises')
        .set('Authorization', `Bearer ${userToken}`)
        expect(res.status).toBe(200)
        expect(res.body.length).toBeGreaterThanOrEqual(1)
    })
})

describe('GET /api/exercises/:id', () => {
    it('Would get details of an exercise', async () => {
        const res = await request(app)
        .get(`/api/exercises/${exerciseId}`)
        .set('Authorization', `Bearer ${userToken}`)
        expect(res.status).toBe(200)
        expect(res.body.creator).toHaveProperty('username')
    })

    it('Would return 404 if not found', async () => {
        const res = await request(app)
        .get('/api/exercises/9999')
        .set('Authorization', `Bearer ${userToken}`)
        expect(res.status).toBe(404)
    })
})

describe('DELETE /api/exercises/:id', () => {
    it('Would delete the own exercise', async () => {
        const res = await request(app)
        .delete(`/api/exercises/${exerciseId}`)
        .set('Authorization', `Bearer ${userToken}`)
        expect(res.status).toBe(200)
    })
})