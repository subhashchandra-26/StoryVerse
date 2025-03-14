// comicRoutes.js
const express = require('express');
const { uploadComic, getComics, getComicById, upload} = require('../controllers/comicController');
const authMiddleware = require('../middleware/authMiddleware');
const router = express.Router();

router.post('/comics', authMiddleware(['author']), upload.fields([
    { name: 'coverImage', maxCount: 1 },
    { name: 'document', maxCount: 1 },
  ]), uploadComic);
router.get('/comics', getComics);
router.get('/comics/:id', getComicById);

module.exports = router;