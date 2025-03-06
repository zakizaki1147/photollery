const express = require('express');
const db = require('../config/db');
const upload = require('../config/multerConfig')
const verifyToken = require('../middleware/auth');

const router = express.Router();

router.post("/upload_photo", verifyToken, upload.single("foto"), (req, res) => {
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

router.get("/photos", (req, res) => {
    const sql = "SELECT FotoID, JudulFoto, LokasiFile FROM foto";

    db.query(sql, (err, result) => {
        if (err) {
            console.error("Database fetch error:", err);
            return res.status(500).json({ message: "Database error!" });
        }
        res.json(result);
    })
});

module.exports = router;