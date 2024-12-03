const express = require('express');
const router = express.Router();


const {createTrip, getAllTripsByUserId, getTripsById} = require('../controllers/trip_controller');
const { jwtAuth } = require('../auth/auth');


router.post('/createTrip', jwtAuth, createTrip);
router.get('/getAllTripsByUser', jwtAuth, getAllTripsByUserId);
router.get('/getTripById/:id', jwtAuth, getTripsById);





module.exports = router;