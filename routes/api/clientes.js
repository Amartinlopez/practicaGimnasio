const router = require('express').Router();
const { check, validationResult } = require('express-validator');
const Cliente = require('../../models/cliente');

//GET http://localhost:3000/api/clientes
router.get('/', async (req, res) => {
    const rows = await Cliente.getAll()
    res.json(rows)
});


//GET http://localhost:3000/api/clientes
router.get('/:clientId', async (req, res) => {
    const client = await Cliente.getById(req.params.clientId);
    res.json(client)
})

//POST http://localhost:3000/api/clientes
router.post('/', [
    check('nombre', 'El nombre del cliente debe tener entre 3 y 15 caracteres.').isLength({ min: 3, max: 15 }),
    check('apellidos', 'Los apellidos del cliente deben tener entre 3 y 30 caracteres.').isLength({ min: 3, max: 30 }).isAlphanumeric(),
    check('direccion', 'La dirección debe contener al menos 10 caracteres').isLength({ min: 10, max: 150 }),
    check('email', 'El email no es válido').isEmail(),
    check('edad', 'La edad introducida no es válida').isInt({ min: 0, max: 100 }),
    check('fecha_nacimiento', 'La fecha de nacimiento debe ser introducida de esta manera aaaa-mm-dd'),
    check('sexo', 'Solo puede introducir Other, M o F'),
    check('dni', 'El DNI no es válido').custom(value => {
        return (/^\d{8}[a-zA-Z]$/).test(value)
    }),

], async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(422).json(errors.array())
    }
    const result = await Cliente.createClient(req.body);
    if (result['affectedRows'] === 1) {
        res.json({ mensaje: 'Se ha creado el cliente' })
    } else {
        res.json({ error: 'No se ha podido crear el cliente' })
    }
});

//PUT http://localhost:3000/api/clientes/:id
router.put('/:id', async (req, res) => {
    const result = await Cliente.editClient(req.body, req.params.id)
    if (result['affectedRows'] === 1) {
        res.json({ mensaje: 'Se ha editado el cliente' })
    } else {
        res.json({ error: 'Se ha producido un error al editar el cliente' })
    }
});

//DELETE http://localhost:3000/api/clientes/
router.delete('/', async (req, res) => {
    const result = await Cliente.deleteById(req.body.id);
    if (result['affectedRows'] === 1) {
        res.json({ mensaje: 'Se ha borrado el cliente' })
    } else {
        res.json({ error: 'No se ha podido borrar el cliente' })
    }
});



module.exports = router