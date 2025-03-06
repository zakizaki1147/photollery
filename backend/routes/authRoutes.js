const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const db = require('../config/db');

const router = express.Router();

router.post('/register', async (req, res) => {
    const { namaLengkap, alamat, username, email, password } = req.body;

    if (!namaLengkap || !alamat || !username || !email || !password) {
        return res.status(400).json({ message: 'Please fill all the columns!' });
    }

    try {
        const checkEmailSql = `SELECT * FROM user WHERE email = ?`;
        db.query(checkEmailSql, [email], async (err, results) => {
            if (err) {
                console.error('Database error:', err);
                return res.status(500).json({ message: 'Database error!' });
            }

            if (results.length > 0) {
                return res.status(400).json({ message: 'Email already registered!' });
            }

            const saltRounds = 10;
            const hashedPassword = await bcrypt.hash(password, saltRounds);
            const sql = `INSERT INTO user (NamaLengkap, Alamat, Username, Email, Password) VALUES (?, ?, ?, ?, ?)`;
            const values = [namaLengkap, alamat, username, email, hashedPassword];

            db.query(sql, values, (err, result) => {
                if (err) {
                    console.error('Failed to register user:', err);
                    return res.status(500).json({ message: 'Failed to register user.' });
                }
                res.status(201).json({ message: 'User successfully registered', UserID: result.insertId });
            });
        });
    } catch (error) {
        console.error('Error hashed password:', error);
        res.status(500).json({ message: 'Internal server error.' })
    }
});

router.post('/login', (req, res) => {
    const { username, password } = req.body;

    if (!username || !password) {
        return res.status(400).json({ message: 'Please fill all fields!' })
    }

    try {
        const sql = 'SELECT * FROM user WHERE Username = ?';
        db.query(sql, [username], async (err, results) => {
            if (err) {
                return res.status(500).json({ message: 'Server error!' });
            }
            if (results.length === 0) {
                return res.status(401).json({ message: 'Invalid username or password!' });
            }

            const user = results[0];
            const isMatch = await bcrypt.compare(password, user.Password)

            if (!isMatch) {
                return res.status(401).json({ message: 'Invalid username or password!' })
            }

            const token = jwt.sign(
                { id: user.UserID, username: user.Username, email: user.Email },
                process.env.JWT_SECRET,
                { expiresIn: "1h" }
            );

            return res.status(200).json({ 
                message: 'Login successful',
                token: token
            });
        });
    } catch (error) {
        console.error("Login error:", error);
        return res.status(500).json({ message: 'Server error!' });
    }
});

module.exports = router;