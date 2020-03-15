const router = require('express').Router();
const { check, validationResult } = require('express-validator');
const Profesor = require('../../models/profesor');

//GET http://localhost:3000/api/profesores
router.get('/', async (req, res) => {
    const rows = await Profesor.getAll()
    res.json(rows)
});


//GET http://localhost:3000/api/profesores/:profesorId
router.get('/:profesorId', async (req, res) => {
    const teacher = await Profesor.getById(req.params.profesorId);
    res.json(teacher)
})

//POST http://localhost:3000/api/profesores
router.post('/', [
    check('nombre', 'El nombre del profesor debe tener entre 3 y 15 caracteres.').isLength({ min: 3, max: 15 }),
    check('experiencia', 'La experiencia introducida no es válida').isInt({ min: 0, max: 100 }),
], async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(422).json(errors.array())
    }
    const result = await Profesor.createTeacher(req.body);
    if (result['affectedRows'] === 1) {
        res.json({ mensaje: 'Se ha creado el profesor' })
    } else {
        res.json({ error: 'No se ha podido crear el profesor' })
    }
});

//PUT http://localhost:3000/api/profesores/:id
router.put('/:id', async (req, res) => {
    const result = await Profesor.editTeacher(req.body, req.params.id)
    if (result['affectedRows'] === 1) {
        res.json({ mensaje: 'Se ha editado el profesor' })
    } else {
        res.json({ error: 'No se ha podido editar el profesor' })
    }
});

//DELETE http://localhost:3000/api/profesores
router.delete('/', async (req, res) => {
    const result = await Profesor.deleteById(req.body.id);
    if (result['affectedRows'] === 1) {
        res.json({ mensaje: 'Se ha borrado el profesor' })
    } else {
        res.json({ error: 'No se ha podido borrar el profesor' })
    }
});


module.exports = router