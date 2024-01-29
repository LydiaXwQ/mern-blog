import User from "../models/user.model.js";
import bcryptjs from "bcryptjs";

export const signup = async (req, res) => {
  const { username, email, password } = req.body;
  if (
    !username ||
    !email ||
    !password ||
    username === "" ||
    email === "" ||
    password === ""
  ) {
    return res.status(400).json({ message: "All fields are required" });
  }

  //   encrypt the password
  const hashedPassword = bcryptjs.hashSync(password, 10);

  //   After a new user sign-up, create a new user using the user model
  const newUser = new User({
    username,
    email,
    password: hashedPassword,
  });

  try {
    await newUser.save();
    res.json("sign-up successful");
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
