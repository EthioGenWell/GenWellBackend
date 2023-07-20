const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    email: { type: String, unique: true },
    password: String
    
  });

const User= new mongoose.model("Users", userSchema);

module.exports = User;