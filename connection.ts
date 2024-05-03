const cert = require('./cert.ts')
const pg = require('pg');
const { Pool } = pg;

//for local testing
// const config = {
//     user: cert.user,
//     password: cert.password,
//     host: cert.host,
//     port: cert.port,
//     database: cert.name,
//     ssl: {
//         rejectUnauthorized: true,
//         ca: cert.cert,
//     },
// };

const config = {
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    database: process.env.DB_NAME,
    ssl: {
        rejectUnauthorized: true,
        ca: process.env.DB_CERT,
    },
};

const pool = new Pool(config);
pool.connect(function (err) {
    if (err)
        throw err;
})

module.exports = pool;