const getAll = () => {
    return new Promise((resolve, reject) => {
        db.query('select * from profesores', (err, rows) => {
            if (err) {
                reject(err)
            } else {
                resolve(rows)
            }
        })
    })
};

const getById = (pTeacherId) => {
    return new Promise((resolve, reject) => {
        db.query('select * from profesores where id = ?', [pTeacherId], (err, rows) => {
            if (err) reject(err);
            if (rows.length === 0) {
                resolve(null);
            }
            resolve(rows[0]);
        })
    });
};

const createTeacher = ({ nombre, experiencia }) => {
    return new Promise((resolve, reject) => {
        db.query('INSERT INTO profesores (nombre, experiencia) VALUES (?,?)', [nombre, experiencia],
            (err, result) => {
                if (err) reject(err)
                resolve(result)
            });
    });
};

const editTeacher = ({ nombre, experiencia }, teacherId) => {
    return new Promise((resolve, reject) => {
        db.query('UPDATE profesores SET nombre = ?, experiencia = ? WHERE id = ?', [nombre, experiencia, teacherId], (err, result) => {
            if (err) return reject(err);
            resolve(result);
        });
    });
};

const deleteById = (pTeacherId) => {
    return new Promise((resolve, reject) => {
        db.query('delete from profesores where id = ?', [pTeacherId], (err, result) => {
            if (err) reject(err);
            resolve(result)
        })
    })
};

module.exports = {
    getAll: getAll,
    getById: getById,
    createTeacher: createTeacher,
    editTeacher: editTeacher,
    deleteById: deleteById,
};