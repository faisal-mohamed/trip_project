const express = require('express');
const router = express.Router();

const {regUser, loginUser} = require('../controllers/user_controllers')



router.post('/register', regUser)
router.post('/login', loginUser)




module.exports = router;



