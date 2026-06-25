import Exercise from '../models/Exercise.js'
import User from '../models/User.js'

export const getAll = async (req, res, next) => {
    try {
        const isPublic = req.query.public === 'true'
        const where = isPublic
            ? { isOfficial: true }
            : { createdBy: req.user.id }

        const exercises = await Exercise.findAll({ where })
        res.json(exercises)
    } catch (error) {
        next(error)
    }
}

export const getById = async (req, res, next) => {
    try {
        const exercise = await Exercise.findByPk(req.params.id, {
        include: [{ model: User, as: 'creator', attributes: ['id', 'username'] }]
        })

        if (!exercise) return res.status(404).json({ error: 'Exercise not found' })
        res.json(exercise)
    } catch (error) {
        next(error)
    }
}

export const create = async (req, res, next) => {
    try {
        const { name, description, muscleGroup, isOfficial } = req.body
        const exercise = await Exercise.create({
        name,
        description,
        muscleGroup,
        isOfficial: req.user.role === 'trainer' ? (isOfficial || false) : false,
        createdBy: req.user.id
        })
        res.status(201).json(exercise)
    } catch (error) {
        next(error)
    }
}

export const update = async (req, res, next) => {
    try {
        const exercise = await Exercise.findByPk(req.params.id)

        if (!exercise) return res.status(404).json({ error: 'Exercise not found' })

        if (exercise.createdBy !== req.user.id && req.user.role !== 'trainer') {
        return res.status(403).json({ error: 'You have not permission to modify this exercise' })
        }
        const updateData = { ...req.body }
        if (req.user.role !== 'trainer') {
            delete updateData.isOfficial
        }
        await exercise.update(updateData)
        res.json(exercise)
    } catch (error) {
        next(error)
    }
}

export const remove = async (req, res, next) => {
    try {
        const exercise = await Exercise.findByPk(req.params.id)

        if (!exercise) return res.status(404).json({ error: 'Exercise not found' })
            
        if (exercise.createdBy !== req.user.id && req.user.role !== 'trainer') {
        return res.status(403).json({ error: 'You have not permission to delete this exercise' })
        }
        await exercise.destroy()
        res.json({ message: 'Exercise deleted' })
    } catch (error) {
        next(error)
    }
}
