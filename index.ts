const fs = require('fs');
const pg = require('pg');
const url = require('url');

const Pool = require('pg').Pool;
const pool = new Pool({
    user: process.env.DB_USER,
    host: process.env.DB_HOST,
    database: process.env.DB_NAME,
    password: process.env.DB_PASSWORD,
    port: process.env.DB_PORT,
})

const db = require('./symptom-queries.ts')
const user = require("./user-queries.ts");

const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const port = 3000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/', (req, res) => {
    res.json({ info: 'Node.js, Express, and Postgres API' })
})
app.listen(port, () => {
    console.log(`Listening on ${port}`);
})

app.get('/api/users', db.getUsers)
app.get('/api/symptoms', db.getSymptoms)
app.get('/api/symptoms/:id', db.getSymptomById)
app.post('/api/symptoms', db.createSymptom)
app.put('/api/symptoms/:id', db.modifySymptom)
app.delete('/api/symptoms/:id', db.deleteSymptom)
