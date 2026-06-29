import { z } from 'zod'

export const createRoutineSchema = z.object({
  name: z.string().min(1, 'El nombre es requerido').max(100),
  description: z.string().max(500).optional()
})

export const updateRoutineSchema = z.object({
  name: z.string().min(1).max(100).optional(),
  description: z.string().max(500).optional()
})

export const addExerciseSchema = z.object({
  exerciseId: z.number().int().positive(),
  order: z.number().int().min(0).optional(),
  sets: z.number().int().positive(),
  reps: z.string().min(1),
  weight: z.number().positive().optional()
})
