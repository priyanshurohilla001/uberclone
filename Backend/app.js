const dotenv = require("dotenv");
dotenv.config();

const cookieParser = require("cookie-parser");

const cors = require("cors");

const connectToDb = require("./db/db");
connectToDb();

const express = require("express");

const userRoutes = require("./routes/user.routes");
const captainRoutes = require('./routes/captain.routes')
const mapRoutes = require("./routes/maps.routes");
const rideRoutes = require("./routes/ride.routes");

const app = express();
app.use(cors());
app.use(express.json());
app.use(cookieParser());

app.get("/", (req, res) => {
  res.send("hello");
});

app.use("/users", userRoutes);
app.use("/captains",captainRoutes);
app.use("/maps", mapRoutes);
app.use("/rides", rideRoutes);


module.exports = app;
