const getAll = () => {
    return new Promise((resolve, reject) => {
        db.query('select * from clientes', (err, rows) => {
            if (err) {
                reject(err)
            } else {
                resolve(rows)
            }
        })
    })
};

const getById = (pClientId) => {
    return new Promise((resolve, reject) => {
        db.query('select * from clientes where id = ?', [pClientId], (err, rows) => {
            if (err) reject(err);
            if (rows.length === 0) {
                resolve(null);
            }
            resolve(rows[0]);
        })
    });
};

const createClient = ({ nombre, apellidos, direccion, email, edad, sexo, cuota, fecha_nacimiento, dni, fk_profesor }) => {
    return new Promise((resolve, reject) => {
        db.query('INSERT INTO clientes (nombre, apellidos, direccion, email, edad, sexo, fecha_inscripcion, cuota, fecha_nacimiento, dni, fk_profesor) VALUES (?,?,?,?,?,?,?,?,?,?,?)', [nombre, apellidos, direccion, email, edad, sexo, new Date(), cuota, fecha_nacimiento, dni, fk_profesor],
            (err, result) => {
                if (err) reject(err)
                resolve(result)
            });
    });
};

const editClient = ({ nombre, apellidos, direccion, email, edad, sexo, fecha_inscripcion, cuota, fecha_nacimiento, dni }, clienteId) => {
    return new Promise((resolve, reject) => {
        db.query('UPDATE clientes SET nombre = ?, apellidos = ?, direccion = ?, email = ?, edad = ?, sexo = ?, fecha_inscripcion = ?, cuota = ?, fecha_nacimiento = ?, dni = ? WHERE id = ?', [nombre, apellidos, direccion, email, edad, sexo, fecha_inscripcion, cuota, fecha_nacimiento, dni, clienteId], (err, result) => {
            if (err) return reject(err);
            resolve(result);
        });
    });
};

const deleteById = (pClienteId) => {
    return new Promise((resolve, reject) => {
        db.query('delete from clientes where id = ?', [pClienteId], (err, result) => {
            if (err) reject(err);
            resolve(result)
        })
    })
};

module.exports = {
    getAll: getAll,
    getById: getById,
    createClient: createClient,
    editClient: editClient,
    deleteById: deleteById,
};