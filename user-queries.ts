const pool = require('./connection.ts');

const getUsers = (request, response) => {
    pool.query('SELECT * FROM Users', (error, results) => {
        if (error) {
            throw error;
        }
        response.status(200).json(results.rows)
    }, [])
}

module.exports = {
    getUsers
}