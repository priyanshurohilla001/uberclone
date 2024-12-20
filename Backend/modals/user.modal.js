const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const bcrypt = require('bcrypt')

const userSchema = new mongoose.Schema({
  fullname: {
    firstname: {
      type: String,
      required: true,
      minLength: [3, "First Name must be atleast 3 characters"],
    },
    lastname: {
      type: String,
      minLength: [3, "Last Name must be atleast 3 characters"],
    },
  },
  email: {
    type: String,
    required: true,
    unique: true,
    minLength: [6, "Email must be atleast 6 characters"],
  },
  password: {
    type: String,
    required: true,
    select: false,
  },
  socketId: {
    type: String,
  },
});

userSchema.methods.generateAuthToken = () => {
  const token = jwt.sign({ _id: this._id }, process.env.JWT_SECRET);
  return token;
};

userSchema.methods.comparePassword = async (password) => {
  return await bcrypt.compare(password, this.password);
};

userSchema.statics.hashPassword = async (password) => {
  return await bcrypt.hash(password, 10);
};

const userModel = mongoose.model('user',userSchema);

module.exports = userModel;