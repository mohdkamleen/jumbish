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

module.exports.fetchCurrentUser = async (req, res, next) => {
  try {
    const newUser = User.find({ "profile.phone": req.body.phone });
    res.status(200).json(newUser);
  } catch (err) {
    next(err);
  }
};


