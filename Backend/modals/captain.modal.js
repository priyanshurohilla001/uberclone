import { Schema, model } from "mongoose";
import { compare, hash } from "bcrypt";
import jwt from "jsonwebtoken";

const captainSchema = new Schema({
  fullname: {
    firstname: {
      type: String,
      required: true,
      minlength: [3, "First Name must be atleast 3 characters"],
    },
    lastname: {
      type: String,
      minlength: [3, "Last Name must be atleast 3 characters"],
    },
  },
  email: {
    type: String,
    lowercase: true,
    required: true,
    unique: true,
    minlength: [6, "Email must be atleast 6 characters"],
  },
  password: {
    type: String,
    required: true,
    select: false,
  },
  socketId: {
    type: String,
  },
  status: {
    type: String,
    enum: ["active", "inactive"],
    default: "inactive",
  },

  vehicle: {
    color: {
      type: String,
      required: true,
      minlength: [3, "Color must be 3 characters long"],
    },
    plate: {
      type: String,
      required: true,
      minlength: [3, "Plate must be 3 characters long"],
    },
    capacity: {
      type: Number,
      required: true,
      min: [1, "Capacity must be 1"],
    },
    vehicleType: {
      type: String,
      required: true,
      enum: ["car", "motorcycle", "auto"],
    },
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

captainSchema.methods.generateAuthToken = function () {
  const token = jwt.sign({ _id: this._id }, process.env.JWT_SECRET, {
    expiresIn: "24h",
  });
  return token;
};

captainSchema.methods.comparePassword = async function (password) {
  return await compare(password, this.password);
};

captainSchema.statics.hashPassword = async function (password) {
  return await hash(password, 10);
};

const captainModel = model("captain", captainSchema);

export default captainModel;
