import { Schema, model } from "mongoose";

const rideSchema = Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: "user",
    required: true,
  },
  captain: {
    type: Schema.Types.ObjectId,
    ref: "captain",
  },
  origin: {
    type: String,
    required: true,
  },
  destination: {
    type: String,
    required: true,
  },
  fare: {
    type: Number,
    required: true,
  },
  status: {
    type: String,
    enum: ["pending", "accepted", "ongoing", "completed", "cancelled"],
    default: "pending",
  },
  otp: {
    type: String,
    required: true,
    select: false,
  },
  createdAt: {
    type: Date,
    default: () => Date.now(),
  },
  radMul: {
    type: Number,
    default: 1,
  },
});

export default model("ride", rideSchema);
