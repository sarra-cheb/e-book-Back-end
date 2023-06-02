const express = require('express');
const uploadFile = require('../middlewares/multer');
const { addBook, getBook, editBook, deleteBook, getbyidBook } = require('../Controllers/BookController');
const passport = require('passport');
const authRole = require('../Passport/VerifyUser');
const typeClient = require('../Passport/VerifyUser')

const router = express.Router();

router.post('/book', passport.authenticate('bearer', { session: false }), uploadFile.single('contenue'), addBook);
router.get('/book', getBook)
router.get('/book/:id', passport.authenticate('bearer', { session: false }), authRole("admin", "client"), getbyidBook)
router.put('/book/:id', passport.authenticate('bearer', { session: false }), authRole("admin"), editBook)
router.delete('/book/:id', passport.authenticate('bearer', { session: false }), authRole("admin"), deleteBook)


module.exports = router