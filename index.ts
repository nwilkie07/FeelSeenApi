const fs = require('fs');
const pg = require('pg');
const url = require('url');
const dbConfig = require('./cert.ts');

const Pool = require('pg').Pool;
const pool = new Pool({
    user: dbConfig.user,
    host: dbConfig.host,
    database: dbConfig.database,
    password: dbConfig.password,
    port: dbConfig.port,
})

const db = require('./symptom-queries.ts')

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

app.get('/symptoms', db.getSymptoms)
app.get('/symptoms/:id', db.getSymptomById)
app.post('/symptoms', db.createSymptom)
app.put('/symptoms/:id', db.modifySymptom)
app.delete('/symptoms/:id', db.deleteSymptom)