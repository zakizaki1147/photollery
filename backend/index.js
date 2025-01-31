const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'db_galerifoto'
});

db.connect((err) => {
    if (err) {
        console.error('Failed to connect to database:', err);
    } else {
        console.log('Connected to db_galerifoto.');
    }
});

app.post('/api/users', (req, res) => {
    const { namaLengkap, alamat, username, email, password } = req.body;

    if (!namaLengkap || !alamat || !username || !email || !password) {
        return res.status(400).json({ message: 'Please fill all the columns!' });
    }
// miaw
    const sql = `INSERT INTO user (NamaLengkap, Alamat, Username, Email, Password) VALUES (?, ?, ?, ?, ?)`;
    const values = [namaLengkap, alamat, username, email, password];

    db.query(sql, values, (err, result) => {
        if (err) {
            console.error('Failed to register user:', err);
            return res.status(500).json({ message: 'Failed to register user.' });
        }
        res.status(201).json({ message: 'User successfully registered', userId: result.insertId });
    });
});

app.listen(5000, () => {
    console.log('Server runs on port 5000.');
});