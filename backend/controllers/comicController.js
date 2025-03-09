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
const upload = multer({ storage });

// Upload a new comic
const uploadComic = async (req, res) => {
  try {
    const { title, description } = req.body;
    console.log(req.headers)

    // Check if required fields are provided
    if (!title || !description || !req.files['coverImage'] || !req.files['document']) {
      return res.status(400).json({ message: 'All fields are required, including cover image and document.' });
    }

    // Get file paths from multer
    const coverImage = req.files['coverImage'][0].path;
    const document = req.files['document'][0].path;

    // Create a new comic
    const comic = new Comic({
      title,
      description,
      coverImage,
      document,
      author: req.user.id, // Attach the authenticated user's ID as the author
    });

    // Save the comic to the database
    await comic.save();

    // Return success response
    res.status(201).json({ message: 'Comic uploaded successfully.', comic });
  } catch (err) {
    console.error('Error uploading comic:', err);
    res.status(500).json({ message: 'Server error during comic upload.' });
  }
};

// Get all comics
const getComics = async (req, res) => {
  try {
    // Fetch all comics and populate the author's username
    const comics = await Comic.find().populate('author', 'username');
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