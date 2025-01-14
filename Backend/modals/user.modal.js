import { Schema, model } from "mongoose";
import jwt from "jsonwebtoken";
import { compare, hash } from "bcrypt";

const userSchema = new Schema({
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
  location: {
    lat: {
      type: Number,
    },
    lng: {
      type: Number,
    },
  },
});

userSchema.methods.generateAuthToken = function () {
  const token = jwt.sign({ _id: this._id }, process.env.JWT_SECRET, {
    expiresIn: "24h",
  });
  return token;
};

userSchema.methods.comparePassword = async function (password) {
  return await compare(password, this.password);
};

userSchema.statics.hashPassword = async function (password) {
  return await hash(password, 10);
};

const userModel = model("user", userSchema);

export default userModel;
