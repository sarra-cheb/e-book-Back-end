const express = require('express');
const { downloadBook, getListOfClient } = require('../Controllers/DownloadController');
const passport = require('passport');

const router = express.Router();
router.get('/download/:id', passport.authenticate('bearer', { session: false }), downloadBook)
router.get('/download', passport.authenticate('bearer', { session: false }), getListOfClient)

module.exports = router