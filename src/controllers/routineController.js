import Routine from '../models/Routine.js'
import RoutineExercise from '../models/RoutineExercise.js'
import Exercise from '../models/Exercise.js'

export const getAll = async (req, res, next) => {
  try {
    const routines = await Routine.findAll({
      where: { userId: req.user.id },
      include: [{ model: RoutineExercise, as: 'exercises' }]
    })
    res.json(routines)
  } catch (error) {
    next(error)
  }
}

export const getById = async (req, res, next) => {
  try {
    const routine = await Routine.findByPk(req.params.id, {
      include: [{
        model: RoutineExercise,
        as: 'exercises',
        include: [{ model: Exercise, as: 'exercise', attributes: ['id', 'name', 'muscleGroup'] }]
      }]
    })
    if (!routine) return res.status(404).json({ error: 'Rutina no encontrada' })
    if (routine.userId !== req.user.id) return res.status(403).json({ error: 'No tenés permiso' })
    res.json(routine)
  } catch (error) {
    next(error)
  }
}

export const create = async (req, res, next) => {
  try {
    const routine = await Routine.create({
      name: req.body.name,
      description: req.body.description,
      userId: req.user.id
    })
    res.status(201).json(routine)
  } catch (error) {
    next(error)
  }
}

export const update = async (req, res, next) => {
  try {
    const routine = await Routine.findByPk(req.params.id)
    if (!routine) return res.status(404).json({ error: 'Rutina no encontrada' })
    if (routine.userId !== req.user.id) return res.status(403).json({ error: 'No tenés permiso' })
    await routine.update(req.body)
    res.json(routine)
  } catch (error) {
    next(error)
  }
}

export const remove = async (req, res, next) => {
  try {
    const routine = await Routine.findByPk(req.params.id)
    if (!routine) return res.status(404).json({ error: 'Rutina no encontrada' })
    if (routine.userId !== req.user.id) return res.status(403).json({ error: 'No tenés permiso' })
    await routine.destroy()
    res.json({ message: 'Rutina eliminada' })
  } catch (error) {
    next(error)
  }
}

export const addExercise = async (req, res, next) => {
  try {
    const routine = await Routine.findByPk(req.params.id)
    if (!routine) return res.status(404).json({ error: 'Rutina no encontrada' })
    if (routine.userId !== req.user.id) return res.status(403).json({ error: 'No tenés permiso' })

    const exercise = await Exercise.findByPk(req.body.exerciseId)
    if (!exercise) return res.status(404).json({ error: 'Ejercicio no encontrado' })

    const routineExercise = await RoutineExercise.create({
      routineId: routine.id,
      exerciseId: req.body.exerciseId,
      order: req.body.order ?? 0,
      sets: req.body.sets,
      reps: req.body.reps,
      weight: req.body.weight
    })
    res.status(201).json(routineExercise)
  } catch (error) {
    next(error)
  }
}

export const removeExercise = async (req, res, next) => {
  try {
    const routine = await Routine.findByPk(req.params.id)
    if (!routine) return res.status(404).json({ error: 'Rutina no encontrada' })
    if (routine.userId !== req.user.id) return res.status(403).json({ error: 'No tenés permiso' })

    const routineExercise = await RoutineExercise.findOne({
      where: { id: req.params.exerciseId, routineId: routine.id }
    })
    if (!routineExercise) return res.status(404).json({ error: 'Ejercicio no encontrado en la rutina' })

    await routineExercise.destroy()
    res.json({ message: 'Ejercicio eliminado de la rutina' })
  } catch (error) {
    next(error)
  }
}
