const  express = require('express');
const  asyncHandler = require('express-async-handler');
const bcrypt = require('bcryptjs');

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

    const { first_name, last_name, email, password } = req.body;
    const isAdmin = req.body.isAdmin? req.body.isAdmin: false;

  // Simple Validation 
    if( !first_name || !last_name || !email || !password)
      return res.status(400).send({ msg: 'Please enter all fields' });

    try {
        const user = await User.findOne({ email });
        if (user) throw Error('User already exists');

        const salt = await bcrypt.genSalt(10);
        if (!salt) throw Error('Something went wrong with bcrypt');
    
        const hashed_password = await bcrypt.hash(password, salt);
        if (!hashed_password) throw Error('Something went wrong hashing the password');

        const newUser = new User({ first_name, last_name, email, password: hashed_password, isAdmin});

        const savedUser = await newUser.save();
        if (!savedUser) throw Error('Something went wrong saving the user');

        const token = getToken(savedUser);
        if(!token) throw Error('Couldnt sign the token');

        res.status(201).send({
          _id: savedUser._id,
          first_name: savedUser.first_name,
          last_name: savedUser.last_name,
          email: savedUser.email,
          isAdmin: savedUser.isAdmin,
          token: token,
        });

    }  catch (e) {
      res.status(400).json({ error: e.message });
        }
 }));

router.post('/signin', asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  // simple validator 
  if (!email || !password) {
    return res.status(400).send({ msg: 'Please enter all fields' });
    }
  try{
      // Check for existing user
      const user = await User.findOne({ email });
      if (!user) throw Error('User Does not exist');

      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) throw Error('Invalid credentials');
 
      const token = getToken(user);
      if(!token) throw Error('Couldnt sign the token');
      
      res.status(201).send({
        _id: user._id,
        first_name: user.first_name,
        last_name: user.last_name,
        email: user.email,
        isAdmin: user.isAdmin,
        token: token 
      });
  } catch(error){
    res.status(400).send({ msg: e.message });
  }
}));


module.exports = router;
