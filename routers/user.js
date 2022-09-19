const express = require('express');
const router = express.Router()
const { register, updateData, addCart } = require('../controllers/user')

router.route('/register').post(register);
router.route('/update').patch(updateData);
router.route('/cart').patch(addCart);
 
 

module.exports = router;
