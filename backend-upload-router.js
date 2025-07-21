const express = require("express");
const multer = require("multer");
const path = require("path");
const fs = require("fs");
const mongoose = require("mongoose");

const router = express.Router();

// MongoDB Connection
mongoose.connect('mongodb://localhost:27017/supermarket', {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => {
  console.log('Connected to MongoDB');
}).catch(err => {
  console.error('MongoDB connection error:', err);
});

// Image Schema
const imageSchema = new mongoose.Schema({
  filename: String,
  originalName: String,
  url: String,
  userId: String, // Add user identification
  uploadedAt: { type: Date, default: Date.now }
});

const Image = mongoose.model('Image', imageSchema);

// Ensure uploads directory exists
const uploadDir = "uploads/";
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir);
}

// 1. Configure storage
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, uploadDir); // Folder to save files
  },
  filename: function (req, file, cb) {
    // Rename file: image-168383882.png
    const uniqueSuffix = Date.now() + path.extname(file.originalname);
    cb(null, file.fieldname + "-" + uniqueSuffix);
  },
});

// 2. Create upload middleware
const upload = multer({ storage: storage });

// 3. POST route with MongoDB integration
router.post("/image", (req, res) => {
  upload.single("image")(req, res, async function (err) {
    if (err instanceof multer.MulterError) {
      return res
        .status(400)
        .json({ message: "Multer error", error: err.message });
    } else if (err) {
      return res
        .status(500)
        .json({ message: "Server error", error: err.message });
    }
    if (!req.file) {
      return res.status(400).json({ message: "No file uploaded" });
    }

    try {
      // Create image URL
      const imageUrl = `${req.protocol}://${req.get('host')}/api/v1/uploads/image/${req.file.filename}`;
      
      // Save to MongoDB
      const newImage = new Image({
        filename: req.file.filename,
        originalName: req.file.originalname,
        url: imageUrl,
        userId: req.body.userId || 'anonymous', // You can pass userId from frontend
        uploadedAt: new Date()
      });

      await newImage.save();

      res.json({
        message: "File uploaded successfully!",
        file: req.file,
        imageId: newImage._id,
        url: imageUrl
      });
    } catch (dbError) {
      console.error('Database error:', dbError);
      res.status(500).json({ message: "Database error", error: dbError.message });
    }
  });
});

// NEW: GET route to list all images from MongoDB
router.get("/images", async (req, res) => {
  try {
    const images = await Image.find().sort({ uploadedAt: -1 });
    res.json({ images });
  } catch (err) {
    res.status(500).json({ 
      message: "Error fetching images", 
      error: err.message 
    });
  }
});

// NEW: GET route to list images by user
router.get("/images/user/:userId", async (req, res) => {
  try {
    const images = await Image.find({ userId: req.params.userId }).sort({ uploadedAt: -1 });
    res.json({ images });
  } catch (err) {
    res.status(500).json({ 
      message: "Error fetching user images", 
      error: err.message 
    });
  }
});

// GET route to serve an image by filename
router.get("/image/:filename", (req, res) => {
  const filename = req.params.filename;
  const filePath = path.join(__dirname, "..", "uploads", filename);

  // Check if file exists
  fs.access(filePath, fs.constants.F_OK, (err) => {
    if (err) {
      return res.status(404).json({ message: "Image not found" });
    }
    res.sendFile(filePath);
  });
});

module.exports = router;
