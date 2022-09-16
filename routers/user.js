const express = require('express');
const router = express.Router()
const { register, fetchCurrentUser } = require('../controllers/user')

router.route('/register').post(register);
router.route('/fetchCurrentUser').get(fetchCurrentUser);

 

module.exports = router;
