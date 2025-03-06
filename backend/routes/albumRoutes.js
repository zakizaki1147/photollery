const express = require('express');
const db = require('../config/db');
const verifyToken = require('../middleware/auth');

const router = express.Router();

router.post("/add_album", verifyToken, (req, res) => {
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
        
        const checkNameSql = `SELECT * FROM album WHERE NamaAlbum = ? AND UserID = ?`;
        db.query(checkNameSql, [namaAlbum, userID], (err, results) => {
            if (err) {
                console.error("Database error:", err);
                return res.status(500).json({ message: "Database error!" });
            }

            if (results.length > 0) {
                return res.status(400).json({ message: "Album name already exists! Please use other name!" });
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
        });
    } catch (error) {
        console.error("Server error:", error);
        res.status(500).json({ message: "Internal server error!" });
    }
});

router.get("/albums", verifyToken, (req, res) => {
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
        // Mode lengkap: ambil album dengan daftar foto dan user
        const sql = `
            SELECT a.AlbumID, a.NamaAlbum, a.Deskripsi, u.Username,
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

router.get("/albums/:albumID/photos", (req, res) => {
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

module.exports = router;