const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');
const bcrypt = require('bcrypt');
const path = require('path');
const multer = require('multer');
const fs = require('fs');
const jwt = require('jsonwebtoken');
const verifyToken = require('./middleware/auth');
const protectedRoutes = require('./routes/protectedRoutes');
require('dotenv').config();

const app = express();
app.use(cors());
app.use(express.json());
app.use("/uploads", express.static(path.join(__dirname, "uploads")));
app.use("/api/protected", protectedRoutes);

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

app.post('/api/login', (req, res) => {
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
        // Mode lengkap: ambil album dengan daftar foto menggunakan GROUP_CONCAT
        const sql = `
            SELECT 
                a.AlbumID,
                a.NamaAlbum,
                a.Deskripsi,
                u.Username,
                COALESCE(GROUP_CONCAT(
                    JSON_OBJECT(
                        'FotoID', f.FotoID,
                        'JudulFoto', f.JudulFoto,
                        'LokasiFile', f.LokasiFile
                    )
                SEPARATOR ', '), '[]') AS photos
            FROM album a
            JOIN user u ON a.UserID = u.UserID
            LEFT JOIN foto f ON a.AlbumID = f.AlbumID
            WHERE a.UserID = ?
            GROUP BY a.AlbumID, a.Deskripsi, u.Username
        `;

        db.query(sql, [userID], (err, results) => {
            if (err) {
                console.error("Database fetch error:", err);
                return res.status(500).json({ message: "Database fetch error!" });
            }

            // Parsing string JSON agar menjadi array di backend
            res.status(200).json(results.map(album => ({
                ...album,
                photos: album.photos !== '[]' ? JSON.parse(`[${album.photos}]`) : [] // Parsing JSON string menjadi array
            })));
        });
    }
});

app.get("/api/albums/:albumID/photos", (req, res) => {
    const albumID = req.params.albumID;
    const sql = 'SELECT FotoID, JudulFoto, LokasiFile FROM foto WHERE AlbumID = ?';

    db.query(sql, [albumID], (err, results) => {
        if (err) {
            console.error("Database fetch error:", err);
            return res.status(500).json({ message: "Database error!" });
        }
        res.json(results);
    })
})


app.get("/api/photos", (req, res) => {
    const sql = "SELECT FotoID, JudulFoto, LokasiFile FROM foto";

    db.query(sql, (err, result) => {
        if (err) {
            console.error("Database fetch error:", err);
            return res.status(500).json({ message: "Database error!" });
        }
        res.json(result);
    })
});

app.get("/api/photos/:fotoID", (req, res) => {
    const { fotoID } = req.params;
    const sql = `
        SELECT f.FotoID, f.JudulFoto, f.DeskripsiFoto, f.TanggalUnggah, f.LokasiFile, u.UserID, u.Username
        FROM foto f JOIN user u ON f.UserID = u.UserID WHERE f.FotoID = ?
    `;

    db.query(sql, [fotoID], (err, results) => {
        if (err) {
            return res.status(500).json({ message: 'Server error!' });
        }
        if (results.length === 0) {
            return res.status(404).json({ message: 'Photo not found!' });
        }

        const photo = results[0];

        res.json({
            fotoID: photo.FotoID,
            judulFoto: photo.JudulFoto,
            deskripsiFoto: photo.DeskripsiFoto,
            tanggalUnggah: photo.TanggalUnggah,
            lokasiFile: photo.LokasiFile,
            user: {
                id: photo.UserID,
                username: photo.Username
            }
        })
    })
});

app.post("/api/photos/:fotoID/like", verifyToken, async (req, res) => {
    try {
        const { fotoID } = req.params;
        const userID = req.user.id;
        const [checkLike] = await db.promise().query("SELECT * FROM likefoto WHERE FotoID = ? AND UserID = ?", [fotoID, userID]);

        if (checkLike.length > 0) {
            await db.promise().query("DELETE FROM likefoto WHERE FotoID = ? AND UserID = ?", [fotoID, userID]);
            return res.json({ success: true, message: "Photo unliked!", liked: false });
        } else {
            await db.promise().query("INSERT INTO likefoto (FotoID, UserID, TanggalLike) VALUES (?, ?, NOW())", [fotoID, userID]);
            return res.json({ success: true, message: "Photo liked", liked: true });
        }
    } catch (error) {
        console.error("Error liking photo:", error);
        res.status(500).json({ success: false, message: "Server error!" });
    }
});

app.get("/api/photos/:fotoID/likes-token", verifyToken, async (req, res) => {
    try {
        const { fotoID } = req.params;
        const userID = req.user.id;
        const [result] = await db.promise().query("SELECT COUNT(*) AS likeCount FROM likefoto WHERE FotoID = ?", [fotoID]);
        const [userLike] = await db.promise().query("SELECT * FROM likefoto WHERE FotoID = ? AND UserID = ?", [fotoID, userID]);
        res.json({
            likeCount: result[0].likeCount,
            liked: userLike.length > 0,
        });
    } catch (error) {
        console.error("Error fetching likes:", error);
        res.status(500).json({ success: false, message: "Server error!" });
    }
});

app.get("/api/photos/:fotoID/likes-no-token", async (req, res) => {
    try {
        const { fotoID } = req.params;
        const [result] = await db.promise().query("SELECT COUNT(*) AS likeCount FROM likefoto WHERE FotoID = ?", [fotoID]);
        res.json({ likeCount: result[0].likeCount });
    } catch (error) {
        console.error("Error fetching likes:", error);
        res.status(500).json({ success: false, message: "Server error!" });
    }
});

app.get("/api/liked-photos", verifyToken, async (req, res) => {
    try {
        const userID = req.user.id;
        const [likedPhotos] = await db.promise().query(
            `SELECT f.FotoID, f.JudulFoto, f.LokasiFile, u.Username FROM likefoto l
            JOIN foto f ON l.FotoID = f.FotoID 
            JOIN user u ON l.UserID = u.UserID WHERE l.UserID = ?`, [userID]
        );
        
        res.json({ success: true, likedPhotos })
    } catch (error) {
        console.error("Error fetching liked photos:", error);
        res.status(500).json({ success: false, message: "Server error!" });
    }
});

app.post("/api/photos/:fotoID/comment", verifyToken, async (req, res) => {
    try {
        const { fotoID } = req.params;
        const { isiKomentar } = req.body;
        const userID = req.user.id;

        if (!isiKomentar.trim()) {
            return res.status(400).json({ success: false, message: "Komentar tidak boleh kosong!" });
        }

        await db.promise().query("INSERT INTO komentarfoto (FotoID, UserID, IsiKomentar, TanggalKomentar) VALUES (?, ?, ?, NOW())", [fotoID, userID, isiKomentar]);

        const [newComment] = await db.promise().query(
            `SELECT k.KomentarID, k.IsiKomentar, k.TanggalKomentar, u.Username
            FROM komentarfoto k JOIN user u ON k.UserID = u.UserID
            WHERE k.FotoID = ? ORDER BY k.TanggalKomentar DESC LIMIT 1`, [fotoID]
        );

        res.json({ success: true, message: "Komentar berhasil ditambahkan!", comment: newComment[0] });
    } catch (error) {
        console.error("Error adding comment:", error);
        res.status(500).json({ success: false, message: "Server error!" });
    }
});

app.get("/api/photos/:fotoID/comments", async (req, res) => {
    try {
        const { fotoID } = req.params;
        
        const [comments] = await db.promise().query(
            `SELECT k.KomentarID, k.IsiKomentar, k.TanggalKomentar, u.Username 
            FROM komentarfoto k JOIN user u ON k.UserID = u.UserID 
            WHERE k.FotoID = ? ORDER BY k.TanggalKomentar ASC`, [fotoID]
        );

        res.json({ success: true, comments });
    } catch (error) {
        console.error("Error fetching comments:", error);
        res.status(500).json({ success: false, message: "Server error!" });
    }
})

app.listen(5000, () => {
    console.log('Server runs on port 5000.');
});