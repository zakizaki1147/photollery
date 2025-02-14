const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');
const bcrypt = require('bcrypt');
const path = require('path');
const multer = require('multer');
const fs = require('fs');
const verifyToken = require('./middleware/auth');
require('dotenv').config();
const jwt = require('jsonwebtoken');

const app = express();
app.use(cors());
app.use(express.json());
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

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

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "uploads/");
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + path.extname(file.originalname));
    }
});

const upload = multer({
    storage,
    limits: { fileSize: 10 * 1024 * 1024 },
    fileFilter: (req, file, cb) => {
        const supportedFormats = ["image/jpg", "image/jpeg", "image/png"];
        if (!supportedFormats.includes(file.mimetype)) {
            return cb(new Error("Only .jpg, .jpeg, .png are supported!"), false);
        }
        cb(null, true);
    }
});

const uploadDir = path.join(__dirname, 'uploads');
if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir);
}

app.post('/api/register', async (req, res) => {
    const { namaLengkap, alamat, username, email, password } = req.body;

    if (!namaLengkap || !alamat || !username || !email || !password) {
        return res.status(400).json({ message: 'Please fill all the columns!' });
    }

    try {
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
    } catch (error) {
        console.error('Error hashed password:', error);
        res.status(500).json({ message: 'Internal server error.' })
    }
});

app.post('/api/login', (req, res) => {
    const { username, password } = req.body;

    if (!username || !password) {
        return res.status(400).json({ message: 'Please fill all fields!' })
    }

    const sql = 'SELECT * FROM user WHERE Username = ?';
    db.query(sql, [username], (err, results) => {
        if (err) {
            return res.status(500).json({ message: 'Server error!' });
        }
        if (results.length === 0) {
            return res.status(401).json({ message: 'Invalid username or password!' });
        }

        const user = results[0];
        bcrypt.compare(password, user.Password, (err, isMatch) => {
            if (err) {
                return res.status(500).json({ message: 'Error checking password!' });
            }
            if (!isMatch) {
                return res.status(401).json({ message: 'Invalid username or password!' });
            }

            const token = jwt.sign(
                { id: user.UserID, username: user.Username, email: user.Email },
                process.env.JWT_SECRET,
                { expiresIn: "1h" }
            );

            return res.status(200).json({ 
                message: 'Login successful',
                token: token,
                user: {
                    id: user.UserID,
                    username: user.Username,
                    email: user.Email,
                },
            });
        });
    });
});

app.post("/api/upload_photo", verifyToken, upload.single("foto"), (req, res) => {
    const { judulFoto, deskripsiFoto } = req.body;
    const lokasiFile = req.file ? `/uploads/${req.file.filename}` : null;
    const tanggalUnggah = new Date();
    const userID = req.user?.id;
    const albumID = req.body.albumID ? req.body.albumID : null;

    if (!judulFoto || !lokasiFile) {
        return res.status(400).json({ message: "Title and file are required!" });
    }

    const sql = `INSERT INTO foto (JudulFoto, DeskripsiFoto, AlbumID, TanggalUnggah, LokasiFile, UserID) VALUES (?, ?, ?, ?, ?, ?)`;
    const values = [judulFoto, deskripsiFoto, albumID || null, tanggalUnggah, lokasiFile, userID];

    db.query(sql, values, (err, result) => {
        if (err) {
            console.error("Database insert error:", err);
            return res.status(500).json({ message: "Database insert error!" });
        }
        res.json({ message: "Photo uploaded successfully!", data: result });
    });
});

app.post("/api/add_album", verifyToken, (req, res) => {
    try {
        const { namaAlbum, deskripsi } = req.body;
        const tanggalDibuat = new Date().toISOString().slice(0, 19).replace("T", " ");
        const userID = req.user?.id;

        if (!userID) {
            return res.status(401).json({ message: "Unauthorized! UserID not found." });
        }

        if (!namaAlbum) {
            return res.status(400).json({ message: "Please fill all the columns!" });
        }
    
        const sql = `INSERT INTO album (NamaAlbum, Deskripsi, TanggalDibuat, UserID) VALUES (?, ?, ?, ?)`;
        const values = [namaAlbum, deskripsi, tanggalDibuat, userID];
    
        db.query(sql, values, (err, result) => {
            if (err) {
                console.error("Database insert error:", err);
                return res.status(500).json({ message: "Database insert error." });
            }
            res.status(201).json({ message: "Album added successfully!", albumID: result.insertId });
        });
    } catch (error) {
        console.error("Server error:", error);
        res.status(500).json({ message: "Internal server error!" });
    }
});

app.get("/api/albums", verifyToken, (req, res) => {
    const userID = req.user.id;
    const simple = req.query.simple === "true";

    if (simple) {
        // Mode sederhana: hanya ambil AlbumID dan NamaAlbum
        const sql = `SELECT AlbumID, NamaAlbum FROM album WHERE UserID = ?`;
        db.query(sql, [userID], (err, results) => {
            if (err) {
                console.error("Database fetch error:", err);
                return res.status(500).json({ message: "Database fetch error!" });
            }
            res.status(200).json(results);
        });
    } else {
        // Mode lengkap: ambil album dengan daftar foto
        const sql = `
            SELECT a.AlbumID, a.NamaAlbum, 
                COALESCE(JSON_ARRAYAGG(
                    JSON_OBJECT(
                        'FotoID', f.FotoID,
                        'JudulFoto', f.JudulFoto,
                        'LokasiFile', f.LokasiFile
                    )
                ), '[]') AS photos
            FROM album a
            LEFT JOIN foto f ON a.AlbumID = f.AlbumID
            WHERE a.UserID = ?
            GROUP BY a.AlbumID
        `;

        db.query(sql, [userID], (err, results) => {
            if (err) {
                console.error("Database fetch error:", err);
                return res.status(500).json({ message: "Database fetch error!" });
            }
            res.status(200).json(results.map(album => ({
                ...album,
                photos: JSON.parse(album.photos) // Pastikan array photos dikembalikan sebagai objek
            })));
        });
    }
});

app.get("/api/photos", (req, res) => {
    const sql = "SELECT FotoID, JudulFoto, LokasiFile FROM foto";

    db.query(sql, (err, result) => {
        if (err) {
            console.error("Database fetch error:", err);
            return res.status(500).json({ message: "Database error!" });
        }
        res.json(result);
    })
})

app.listen(5000, () => {
    console.log('Server runs on port 5000.');
});