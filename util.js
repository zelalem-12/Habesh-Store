const jwt = require('jsonwebtoken');
const config = require('./config');

const getToken = user => jwt.sign(
  {
    _id: user._id,
    first_name: user.first_name,
    last_name: user.last_name,
    email: user.email,
    isAdmin: user.isAdmin,
  },
  config.JWT_SECRET,
  {
    expiresIn: '48h',
  },
);
const isAuthenticated = (req, res, next) => {
  let token = req.headers['x-access-token'] || req.headers.authorization;
  if (token) {
    if (token.startsWith('Bearer ')) {
      token = token.slice(7, token.length);
    }
    jwt.verify(token, config.JWT_SECRET, (err, decoded) => { //???????
      if (err) {
        return res.status(401).send({
          success: false,
          message: 'Token is not valid',
        });
      }
      req.user = decoded;  // ??????
      next();
    });
  } else {
    return res.status(401).send({
      success: false,
      message: 'Auth token is not supplied',
    });
  }
};

const isAdmin = (req, res, next) => {
  if (req.user && req.user.isAdmin) {
    next();
  } else {
    return res.status(401).send({
      success: false,
      message: 'Admin persmission is not granted.',
    });
  }
};

module.exports = { getToken, isAuthenticated,isAdmin};