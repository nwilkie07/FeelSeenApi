const getSymptoms = (request, response) => {
    pool.query('SELECT * FROM Symptoms ORDER BY id ASC', (error, results) => {
        if (error) {
            throw error;
        }
        response.status(200).json(results.rows)
    }, [])
}

const getSymptomById = (request, response) => {
    const id = parseInt(request.params.id);

    pool.query('SELECT * FROM Symptoms WHERE id = ?', [id], (error, results) => {
        if (error) {
            throw error
        }
        response.status(200).json(results.rows)
    }, [])
}

const createSymptom = (request, response) => {
    const {name, category} = request.body

    pool.query('INSERT INTO Symptoms(name, category) VALUES (?, ?)',[name, category], (error, results) => {
        if (error) {throw error}
        response.status(201).send(`Symptom added with ID: ${results.rows[0].id}`)
    })

}

const modifySymptom = (request, response) => {
    const id = parseInt(request.params.id);
    const {name, category} = request.body;

    pool.query('UPDATE Symptoms SET name = ?, email = ? WHERE id = ?', [name, category, id], (error, results) => {
        if (error) {throw error}
        response.status(200).send(`Symptom modified with ID: ${id}`)
    })
}

const deleteSymptom = (request, response) => {
    const id = parseInt(request.params.id);

    pool.query('DELETE FROM Symptoms WHERE id = ?', [id], (error, results) => {
        if (error) {throw error}
        response.status(200).send(`Symptom deleted with ID: ${id}`)
    })
}

module.exports = {
    getSymptoms,
    createSymptom,
    getSymptomById,
    deleteSymptom,
    modifySymptom
}