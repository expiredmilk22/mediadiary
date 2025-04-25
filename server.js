require('dotenv').config();
const express = require('express');
const cors = require('cors');
const cloudinary = require('cloudinary').v2;
const path = require('path');
const app = express();
const PORT = 3001;

app.use(cors());
app.use(express.json());

// Cloudinary config
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET
});

// Serve static files from the public folder
app.use(express.static(path.join(__dirname, 'public')));

// Delete media route
app.post('/delete-media', async (req, res) => {
  try {
    const publicId = req.body.public_id;
    await cloudinary.uploader.destroy(publicId);
    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Fallback route for SPA
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
