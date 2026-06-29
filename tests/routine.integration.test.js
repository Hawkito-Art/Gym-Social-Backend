import { describe, it, expect } from 'vitest'
import request from 'supertest'
import app from '../src/app.js'

let token, routineId, exerciseId

describe('POST /api/routines', () => {
  it('debería crear una rutina', async () => {
    const reg = await request(app)
      .post('/api/auth/register')
      .send({ username: 'user', email: 'user@test.com', password: '123456' })
    token = reg.body.token

    const res = await request(app)
      .post('/api/routines')
      .set('Authorization', `Bearer ${token}`)
      .send({ name: 'Full body', description: 'Rutina completa' })
    expect(res.status).toBe(201)
    expect(res.body.name).toBe('Full body')
    routineId = res.body.id
  })

  it('debería rechazar sin nombre', async () => {
    const res = await request(app)
      .post('/api/routines')
      .set('Authorization', `Bearer ${token}`)
      .send({})
    expect(res.status).toBe(400)
  })
})

describe('GET /api/routines', () => {
  it('debería listar rutinas del usuario', async () => {
    const res = await request(app)
      .get('/api/routines')
      .set('Authorization', `Bearer ${token}`)
    expect(res.status).toBe(200)
    expect(res.body.length).toBeGreaterThanOrEqual(1)
  })
})

describe('POST /api/routines/:id/exercises', () => {
  it('debería agregar un ejercicio a la rutina', async () => {
    const exerciseRes = await request(app)
      .post('/api/exercises')
      .set('Authorization', `Bearer ${token}`)
      .send({ name: 'Press banca', muscleGroup: 'Pecho' })
    exerciseId = exerciseRes.body.id

    const res = await request(app)
      .post(`/api/routines/${routineId}/exercises`)
      .set('Authorization', `Bearer ${token}`)
      .send({ exerciseId, sets: 4, reps: '8-12', weight: 60 })
    expect(res.status).toBe(201)
    expect(res.body.sets).toBe(4)
  })
})

describe('DELETE /api/routines/:id/exercises/:exerciseId', () => {
  it('debería eliminar ejercicio de la rutina', async () => {
    const res = await request(app)
      .delete(`/api/routines/${routineId}/exercises/1`)
      .set('Authorization', `Bearer ${token}`)
    expect(res.status).toBe(200)
  })
})
