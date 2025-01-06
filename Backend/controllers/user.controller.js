import userModel from "../modals/user.modal.js";
import { createUser } from "../services/user.service.js";
import { validationResult } from "express-validator";
import jwt from "jsonwebtoken";
import BlacklistTokenModel from "../modals/blacklistToken.modal.js";

export async function registerUserController(req, res, next) {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { fullname, email, password } = req.body;

  const isUserExist = await userModel.findOne({ email });

  if (isUserExist) {
    return res.status(400).json({ message: "User already exists" });
  }

  const hashedPassword = await userModel.hashPassword(password);

  const user = await createUser({
    firstname: fullname.firstname,
    lastname: fullname.lastname,
    email,
    password: hashedPassword,
  });

  const token = user.generateAuthToken();

  res.status(201).json({ token, user });
}

export async function loginUserController(req, res, next) {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { email, password } = req.body;

  const user = await userModel.findOne({ email }).select("+password");

  if (!user) {
    return res.status(401).json({ message: "Invalid email or password" });
  }

  const isMatch = await user.comparePassword(password);

  if (!isMatch) {
    return res.status(401).json({ message: "Invalid email or password" });
  }

  const token = user.generateAuthToken();

  res.cookie("token", token);

  return res.status(200).json({ user, token });
}

export async function getUserProfileController(req, res, next) {
  return res.status(200).json(req.user);
}

export async function logoutUserController(req, res, next) {
  res.clearCookie("token");

  const token = req.cookies.token || req.headers.authorization?.split(" ")[1];

  await BlacklistTokenModel.create({ token });

  res.status(200).json({ message: "Logged out" });
}
