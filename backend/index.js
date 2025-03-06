const express = require('express');
const cors = require('cors');
const path = require('path');
const protectedRoutes = require('./routes/protectedRoutes');
require('dotenv').config();

const authRoutes = require('./routes/authRoutes');
const albumRoutes = require('./routes/albumRoutes');
const photoRoutes = require('./routes/photoRoutes');
const likeRoutes = require('./routes/likeRoutes');
const commentRoutes = require('./routes/commentRoutes');

const app = express();

app.use(cors());
app.use(express.json());
app.use("/uploads", express.static(path.join(__dirname, "uploads")));
app.use("/api/protected", protectedRoutes);

app.use('/api', authRoutes);
app.use('/api', albumRoutes);
app.use('/api', photoRoutes);
app.use('/api', likeRoutes);
app.use('/api', commentRoutes);

app.listen(5000, () => {
    console.log('Server runs on port 5000.');
});