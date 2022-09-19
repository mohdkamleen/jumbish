const User = require("../models/user");

module.exports.register = async (req, res, next) => {
  try {
    const au = await User.findOne({ "profile.phone": req.body.phone })
    if (!au) {
      const newUser = new User({ "profile.phone": req.body.phone });
      await newUser.save();
      res.status(200).json(newUser);
    } else {
      res.status(500).json(au);
    }
  } catch (err) {
    next(err);
  }
};

module.exports.updateData = async (req, res, next) => { 
  try {
    const updatedAddress = await User.findByIdAndUpdate(req.body._id, { $set: req.body });
    res.status(200).json(updatedAddress);
  } catch (err) {
    next(err);
  }
};

module.exports.addCart = async (req, res, next) => { 
  try {
    const updatedAddress = await User.findByIdAndUpdate(req.body._id, {$push : { cart: req.body.cart }});
    res.status(200).json(updatedAddress); 
  } catch (err) {
    next(err);
  }
};


