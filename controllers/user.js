const User = require("../models/user");


module.exports.register = async (req, res, next) => { 
  try {
    const newUser = new User({"profile.phone":req.body.phone}); 
    await newUser.save();
    res.status(200).json(newUser);
  } catch (err) { 
    next(err);
  }
};


 