import userModel from "../modals/user.modal.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import BlacklistTokenModel from "../modals/blacklistToken.modal.js";
import captainModel from "../modals/captain.modal.js";

export async function authUser(req, res, next) {
  const token = req.cookies.token || req.headers.authorization?.split(" ")[1];

  if (!token) {
    return res.status(401).json({ message: "unauthorized" });
  }

  const isBlacklisted = await BlacklistTokenModel.findOne({ token });

  if (isBlacklisted) {
    return res.status(401).json({ message: "unauthorized" });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    const user = await userModel.findById(decoded._id);

    req.user = user;

    return next();
  } catch (error) {
    res.status(401).json({ message: "unauthorized" });
  }
}

export async function authCaptain(req, res, next) {
  const token = req.cookies.token || req.headers.authorization?.split(" ")[1];

  if (!token) {
    return res.status(401).json({ message: "unauthorized" });
  }

  const isBlacklisted = await BlacklistTokenModel.findOne({ token });

  if (isBlacklisted) {
    return res.status(401).json({ message: "unauthorized" });
  }

  try {
    const decoded = verify(token, process.env.JWT_SECRET);
    const captain = await captainModel.findById({ _id: decoded._id });
    req.captain = captain;
    return next()
  } catch (error) {
    return res.status(401).json({ message: "unauthorized" });
  }
}
