const express = require('express');
const db = require('../config/db');
const verifyToken = require('../middleware/auth');

const router = express.Router();

router.get("/photos/:fotoID", (req, res) => {
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

router.post("/photos/:fotoID/like", verifyToken, async (req, res) => {
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

router.get("/photos/:fotoID/likes-token", verifyToken, async (req, res) => {
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

router.get("/photos/:fotoID/likes-no-token", async (req, res) => {
    try {
        const { fotoID } = req.params;
        const [result] = await db.promise().query("SELECT COUNT(*) AS likeCount FROM likefoto WHERE FotoID = ?", [fotoID]);
        res.json({ likeCount: result[0].likeCount });
    } catch (error) {
        console.error("Error fetching likes:", error);
        res.status(500).json({ success: false, message: "Server error!" });
    }
});

router.get("/liked-photos", verifyToken, async (req, res) => {
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

module.exports = router;