const express = require("express");
const verifyToken = require("../middleware/auth");
const router = express.Router();

router.get("/", verifyToken, (req, res) => {
    res.json({ message: 'Access granted', user: req.user });
});

module.exports = router;