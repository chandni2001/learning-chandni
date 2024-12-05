const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  username: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  age: { type: Number, required: true },
  gender: { type: String, enum: ['male', 'female'], required: true },
  dob: { type: Date, required: true },
  city: { type: String, required: true },
  profession: { type: String, enum: ['IT', 'Sales', 'Unemployed'], required: true },
  password: { type: String, required: true },
});

module.exports = mongoose.model('User', UserSchema);
