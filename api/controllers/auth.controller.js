import User from "../models/user.model.js";
import bcryptjs from "bcryptjs";
import { errorHandler } from "../utils/error.js";
import jwt from "jsonwebtoken";

export const signup = async (req, res, next) => {
  const { username, email, password } = req.body;
  // user-created error is handled in utils/error.js
  if (
    !username ||
    !email ||
    !password ||
    username === "" ||
    email === "" ||
    password === ""
  ) {
    next(errorHandler(400, "All fields are required"));
  }

  // encrypt the password
  const hashedPassword = bcryptjs.hashSync(password, 10);

  // After a new user sign-up, create a new user using the user model
  const newUser = new User({
    username,
    email,
    password: hashedPassword,
  });

  // system error is handled in index.js
  try {
    await newUser.save();
    res.json("sign-up successful");
  } catch (error) {
    next(error);
  }
};

export const signin = async (req, res, next) => {
  const { email, password } = req.body;
  if (!email || !password || email === "" || password === "") {
    next(errorHandler(400, "All fields are required"));
  }

  try {
    // find a document in User model where email = the given email:
    const validUser = await User.findOne({ email: email });
    // if no user model associate with the given email:
    if (!validUser) {
      return next(errorHandler(404, "User Not Found"));
    }
    // compareSync is for comparing password after hashed:
    const validPassword = bcryptjs.compareSync(password, validUser.password);
    if (!validPassword) {
      return next(errorHandler(404, "Invalid Password"));
    }
    const token = jwt.sign({ id: validUser._id }, process.env.JWT_SECRET);
    const { password: pass, ...rest } = validUser._doc;
    res
      .status(200)
      .cookie("access_token", token, { httpOnly: true })
      .json(rest);
  } catch (error) {
    next(error);
  }
};
