require('dotenv').config()
const express = require('express')
const { Pool } = require('pg')

const pool = new Pool({
    user: process.env.USER,
    host: process.env.PGHOST,
    database: process.env.PGDBNAME,
    password: process.env.PGPASSWORD,
    port: process.env.PGPORT,
    max: process.env.PGPOOLMAX_SIZE
})

const app = express()
app.use(express.json());

const port = process.env.SERVERPORT || 3000

app.get('/', (req, res) => {
    console.log(process.env.PGDBNAME);
    res.send({
        success: true,
        message: "OK",
        data: null,
    });
})

app.get('/todo_list', (req, res) => {
    pool.query('SELECT * FROM todo_list ORDER BY id DESC limit 10', (error, results) => {
        if (error) {
            throw error
        }
        res.send({
            success: true,
            message: "OK",
            data: results.rows,
        });
    })
})

app.post('/todo_list', (req, res) => {
    const { title } = req.body
    
    pool.query('INSERT INTO todo_list (title) VALUES ($1) RETURNING *', [title], (error, results) => {
        if (error) {
            throw error
        }
        res.send({
            success: true,
            message: "OK",
            data: results.rows,
        });
    })
})


app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})

