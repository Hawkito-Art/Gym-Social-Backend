import {z} from 'zod'

export const createExerciseSchema = z.object({
    name: z.string()
        .min(1, 'Name is required')
        .max(100, 'Name cannot exceed 100 characters'),
    description: z.string()
        .max(500, 'Description cannot exceed 500 characters')
        .optional(),
    muscleGroup: z.string()
        .min(1, 'Muscle group is required'),
    isOfficial: z.boolean().optional()
})

export const updateExerciseSchema = z.object({
    name: z.string()
        .min(1)
        .max(100)
        .optional(),
    description: z.string()
        .max(500)
        .optional(),
    muscleGroup: z.string()
        .min(1)
        .optional(),
    isOfficial: z.boolean().optional()
})