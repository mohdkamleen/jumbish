const User = require("../models/user");
var nodemailer = require('nodemailer');

module.exports.getUser = async (req, res, next) => {
  console.log(req.params.username);
  try {
    const user = await User.findOne({ username: req.params.username });
    res.status(200).json(user);
    console.log(user);
  } catch (err) {
    next(err);
    res.status(400).send(err)
  }
};

module.exports.getCurrentUser = async (req, res, next) => { 
  try {
    const user = await User.findOne({ "profile.phone": req.body.phone.replace("+91","")});
    res.status(200).json(user);
    console.log(user);
  } catch (err) {
    next(err);
    res.status(400).send(err) 
  }
};

module.exports.updateUser = async (req, res, next) => { 
  try {
    const user = await User.findByIdAndUpdate(req.body._id,req.body);
    res.status(200).json(user);
    console.log(user);
  } catch (err) {
    next(err);
    res.status(400).send(err) 
  }
};


module.exports.register = async (req, res, next) => {
  console.log(req.body);
  try {
    const newUser = new User(req.body);

    await newUser.save();
    res.status(200).json(newUser);
  } catch (err) {
    next(err);
  }
};
 

module.exports.login = async (req, res, next) => {  
  try {
    const newUser = await User.find({$or:[{ "profile.email": req.body.data }, { "profile.phone": req.body.data }]});
    console.log(newUser);
    res.status(200).json(newUser);
  } catch (err) {
    next(err);
  }
}; 

module.exports.sendMail = async (req, res, next) => {  
  console.log(req.body.data);
  // try {
  //   const newUser = await User.find({$or:[{ "profile.email": req.body.data }, { "profile.phone": req.body.data }]});
  //   console.log(newUser);
  //   res.status(200).json(newUser);
  // } catch (err) {
  //   next(err);
  // } 

  var transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: 'kamleenmohd@gmail.com',
      pass: 'kamleen123'
    }
  });
  
  var mailOptions = {
    from: 'kamleenmohd@gmail.com',
    to: 'vmakertechnologies@gmail.com',
    subject: 'Sending Email using Node.js',
    text: 'That was easy!'
  };
  
  transporter.sendMail(mailOptions, function(error, info){
    if (error) {
      console.log(error); 
    } else {
      console.log('Email sent: ' + info.response);
    }
  });
}; 