const  express = require('express');
const  asyncHandler = require('express-async-handler');
const  Contact = require('../models/contact-model');
const  {isAuthenticated, isAdmin} = require('../util');

const router = express.Router();

router.post('/',  asyncHandler(async (req, res) => {
    const contact = new Contact({
      first_name: req.body.first_name,
      last_name: req.body.last_name,
      email: req.body.email,
      message: req.body.message,
    });
    const newContact = await contact.save();
    res.status(201).send({
    email: newContact.email,
    success: true,
    message: 'We received your message!, Our team will contact you very soon'
    });
  }));

  router.get('/', isAuthenticated, isAdmin, asyncHandler(async (req, res) => {
    const contacts = await Contact.find({});
    res.status(201).send(contacts);
  }));

  module.exports = router;