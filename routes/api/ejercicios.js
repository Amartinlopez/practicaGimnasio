const router = require('express').Router();
const { check, validationResult } = require('express-validator');
const Ejercicio = require('../../models/ejercicio');

//GET http://localhost:3000/api/ejercicios
router.get('/', async (req, res) => {
    const rows = await Ejercicio.getAll()
    res.json(rows)
});


//GET http://localhost:3000/api/ejercicios/:ejercicioId
router.get('/:exerciseId', async (req, res) => {
    const exercise = await Ejercicio.getById(req.params.exerciseId);
    res.json(exercise)
})

//POST http://localhost:3000/api/ejercicios
router.post('/', [
    check('titulo', 'El titulo del ejercicio debe contener entre 3 y 30 caracteres.').isLength({ min: 3, max: 30 }),
    check('duracion', 'La duración del ejercicio debe introducirse en el siguiente formato 00:00:00.'),
    check('repeticiones', 'Hay un máximo de repeticiones.'),
], async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(422).json(errors.array())
    }
    const result = await Ejercicio.createExercise(req.body);
    if (result['affectedRows'] === 1) {
        res.json({ mensaje: 'Se ha creado el ejercicio' })
    } else {
        res.json({ error: 'No se ha podido crear el ejercicio' })
    }
});

//PUT http://localhost:3000/api/ejercicios/:id
router.put('/:id', async (req, res) => {
    const result = await Ejercicio.editExercise(req.body, req.params.id)
    if (result['affectedRows'] === 1) {
        res.json({ mensaje: 'Se ha editado el ejercicio' })
    } else {
        res.json({ error: 'No se ha podido editar el ejercicio' })
    }
});

//DELETE http://localhost:3000/api/ejercicios
router.delete('/', async (req, res) => {
    const result = await Ejercicio.deleteById(req.body.id);
    if (result['affectedRows'] === 1) {
        res.json({ mensaje: 'Se ha borrado el ejercicio' })
    } else {
        res.json({ error: 'No se ha podido borrar el ejercicio' })
    }
});


module.exports = router