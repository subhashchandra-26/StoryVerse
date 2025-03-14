const Comic = require('../models/Comic');
const multer = require('multer');
const path = require('path');

// Configure multer storage
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/'); // Save files in the 'uploads' folder
  },
  filename: (req, file, cb) => {
    // Generate a unique filename using the current timestamp and original filename
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});

// Initialize multer with the storage configuration
const upload = multer({
  storage,
  limits: {
    fileSize: 20 * 1024 * 1024, // 0 MB limit per file
    files: 2, // Maximum of 2 files (coverImage and document)
  },
});

// Upload a new comic
const uploadComic = async (req, res) => {
  try {
    const { title, description } = req.body;
    console.log(req.files)

    // Check if required fields and files are provided
    if (!title || !description || !req.files['coverImage'] || !req.files['document']) {
      return res.status(400).json({ message: 'All fields are required, including cover image and document.' });
    }

    // Access the first file for each field
    const coverImage = req.files['coverImage'][0].path; // Use [0] for the first file
    const document = req.files['document'][0].path; // Use [0] for the first file

    // Create a new comic
    const comic = new Comic({
      title,
      coverImage,
      description,
      document,
      author: req.user.id, // Attach the authenticated user's ID as the author
    });

    // Save the comic to the database
    await comic.save();

    // Return success response
    res.status(201).json({ message: 'Comic uploaded successfully.', comic });
  } catch (err) {
    console.error('Error uploading comic:', err);

    // Handle file upload errors
    if (err instanceof multer.MulterError) {
      return res.status(400).json({ message: 'File upload error: ' + err.message });
    }

    res.status(500).json({ message: 'Server error during comic upload.' });
  }
};

// Get all comics
const getComics = async (req, res) => {
  try {
    const comics = await Comic.find().populate('author', 'username');
    // console.log(comics)
    res.json(comics);
  } catch (err) {
    console.error('Error fetching comics:', err);
    res.status(500).json({ message: 'Server error while fetching comics.' });
  }
};

// Get a single comic by ID
const getComicById = async (req, res) => {
  try {
    const comic = await Comic.findById(req.params.id).populate('author', 'username');

    // Check if the comic exists
    if (!comic) {
      return res.status(404).json({ message: 'Comic not found.' });
    }
    res.json(comic);
  } catch (err) {
    console.error('Error fetching comic by ID:', err);
    res.status(500).json({ message: 'Server error while fetching comic.' });
  }
};

module.exports = { uploadComic, getComics, getComicById, upload };