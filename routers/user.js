const express = require('express'); 
const router = express.Router()  
const { getUser, register, login, getCurrentUser,updateUser,sendMail } = require('../controllers/user')
 
router.route('/:username').get(getUser);
 
router.route('/register').post(register);

router.route('/login').post(login); 

router.route('/user').put(getCurrentUser);

router.route('/user/update').put(updateUser);

router.route('/user/sendmail').post(sendMail);

 
 
module.exports = router;  
 