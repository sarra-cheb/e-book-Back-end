const express = require('express');
const passport = require('passport');
const authRole = require('../Passport/VerifyUser')
const { getuser, updateuser, deleteuser, updateUserClienttoAbonne, getClient, getListOfClients, getData } = require('../Controllers/UserController');
const router = express.Router();
router.get('/user', passport.authenticate('bearer', { session: false }), authRole("admin"), getuser);
router.get('/user/data', passport.authenticate('bearer', { session: false }), authRole("admin"), getData);
router.get('/user/listclients', passport.authenticate('bearer', { session: false }), authRole("admin"), getClient);
router.get('/user/listofclients', passport.authenticate('bearer', { session: false }), authRole("admin"), getListOfClients);
router.put('/user/:id', passport.authenticate('bearer', { session: false }), authRole("admin"), updateuser)
router.delete('/user/:id', passport.authenticate('bearer', { session: false }), authRole("admin"), deleteuser)
router.put('/user/edittypeofclient/:id', passport.authenticate('bearer', { session: false }), authRole("admin"), updateUserClienttoAbonne)

module.exports = router