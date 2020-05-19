const  express = require('express');
const  asyncHandler = require('express-async-handler');
const  User = require('../models/user-model');
const  {isAuthenticated, getToken} = require('../util');


const router = express.Router();

// admins are not allowe to update its profile. 
router.put('/:id', isAuthenticated, asyncHandler(async (req, res) => {
  if (req.params.id !== req.user._id && !req.user.isAdmin) {
    return res.status(401).send({
      success: false,
      message: 'Can not update this user.',
    });
  }
  const user = await User.findById(req.user._id);
  if (user) {
    user.first_name = req.body.first_name || user.first_name;
    user.last_name = req.body.last_name || user.last_name;
    user.email = req.body.email || user.email;
    user.password = req.body.password || user.password;
    const updatedUser = await user.save();
    res.send({
      _id: updatedUser._id,
 first_name: updatedUser.first_name,
  last_name: updatedUser.last_name,
      email: updatedUser.email,
      password: updatedUser.password,
    isAdmin: updatedUser.isAdmin,
      token: getToken(updatedUser),
      
    });
  } else {
    res.status(404).send({ message: 'User not found.' });
  }
}));

router.post('/register', asyncHandler(async (req, res) => {
  const user = new User({
    first_name: req.body.first_name,
    last_name: req.body.last_name,
    email: req.body.email,
    password: req.body.password,
    isAdmin: req.isAdmin || req.body.isAdmin
  });
  const newUser = await user.save();
  res.status(201).send({
    _id: newUser._id,
    first_name: newUser.first_name,
    last_name: newUser.last_name,
    email: newUser.email,
    isAdmin: newUser.isAdmin,
    token: getToken(newUser),
  });
}));

router.post('/signin', asyncHandler(async (req, res) => {
  const signinUser = await User.findOne(
    { email: req.body.email, password: req.body.password },
  );
  if (!signinUser) {
    res.status(401).send({ message: 'Invalid email or password.' });
    return;
  }
  
  res.status(201).send({
    _id: signinUser._id,
    first_name: signinUser.first_name,
    last_name: signinUser.last_name,
    email: signinUser.email,
    isAdmin: signinUser.isAdmin,
    token: getToken(signinUser)
  });
}));

module.exports = router;
