import { config } from "dotenv";
config();

import cookieParser from "cookie-parser";

import cors from "cors";

import connectToDb from "./db/db.js";
connectToDb();

import express, { json } from "express";

import userRoutes from "./routes/user.routes.js";
import captainRoutes from './routes/captain.routes.js';
import mapRoutes from "./routes/maps.routes.js";
import rideRoutes from "./routes/ride.routes.js";

const app = express();
app.use(cors());
app.use(json());
app.use(cookieParser());

app.get("/", (req, res) => {
  res.send("hello");
});

app.use("/users", userRoutes);
app.use("/captains",captainRoutes);
app.use("/maps", mapRoutes);
app.use("/rides", rideRoutes);


export default app;
