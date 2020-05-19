const mongoose = require('mongoose');

const ContactSchema = new mongoose.Schema({
    first_name: { type: String, required: true },
    last_name: { type: String, required: true },
    email: {
      type: String, required: true, unique: true, dropDups: true,
    },
    message: { type: String, required: true }
  
  }, { timestamps: true });
  
  const Contact= mongoose.model('Contact', ContactSchema );
  
  module.exports = Contact;

