const express = require('express');
const db = require('../config/db');
const verifyToken = require('../middleware/auth');

const router = express.Router();

router.post("/photos/:fotoID/comment", verifyToken, async (req, res) => {
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

router.get("/photos/:fotoID/comments", async (req, res) => {
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

module.exports = router;