const express = require('express');
const { addCategory, getCategory, getbyidCategory, editCategory, deleteCategory } = require('../Controllers/CategoryController');
const authRole = require('../Passport/VerifyUser');
const passport = require('passport');

const router = express.Router();

router.post('/category', passport.authenticate('bearer', { session: false }), authRole("admin"), addCategory);
router.get('/category', getCategory)
router.get('/category/:id', passport.authenticate('bearer', { session: false }), authRole("admin", "client"), getbyidCategory)
router.put('/category/:id', passport.authenticate('bearer', { session: false }), authRole("admin"), editCategory)
router.delete('/category/:id', passport.authenticate('bearer', { session: false }), authRole("admin"), deleteCategory)

module.exports = router