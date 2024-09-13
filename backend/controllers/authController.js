const User = require("../models/User");
const jwt = require("jsonwebtoken");
const {
  generateRefreshToken,
  generateAccessToken,
} = require("../utils/generateToken");

exports.registerUser = async (req, res) => {
  const { username, email, password } = req.body;

  try {
    const user = await User.create({ username, email, password });

    //creating a access token
    const accessToken = generateAccessToken({ id: user._id });
    // Creating refresh token not that expiry of refresh
    //token is greater than the access token

    const refreshToken = generateRefreshToken({ id: user._id });

    res.cookie("jwt", refreshToken, {
      httpOnly: true,
      sameSite: "Strict",
      secure: true,
      maxAge: 10 * 24 * 60 * 60 * 1000,
    });

    res.status(201).json({
      success: true,
      accessToken,
    });
  } catch (error) {
    console.log(error);
    res.status(400).json({ success: false, message: error.message });
  }
};

exports.loginUser = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res
      .status(400)
      .json({ success: false, message: "Please provide email and password" });
  }

  try {
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(400).json({ success: false, message: "Invalid email" });
    }

    const isMatch = await user.matchPassword(password);

    if (!isMatch) {
      return res.status(400).json({ message: "Invalid password" });
    }

    //creating a access token
    const accessToken = generateAccessToken({ id: user._id });
    // Creating refresh token not that expiry of refresh
    //token is greater than the access token

    const refreshToken = generateRefreshToken({ id: user._id });

    res.cookie("jwt", refreshToken, {
      httpOnly: true,
      sameSite: "None",
      secure: true,
      maxAge: 10 * 24 * 60 * 60 * 1000,
    });

    return res.status(200).json({
      success: true,
      accessToken,
      user: user.username,
    });
  } catch (error) {
    console.log(error);
    return res.status(410).json({ success: false, message: error });
  }
};

exports.logoutUser = async (req, res) => {
  res.clearCookie("jwt"); // Clear the cookie
  res.sendStatus(204);
};

exports.refreshToken = async (req, res) => {
  try {
    const refreshToken = req.cookies.jwt; // Read refresh token from cookie
    if (!refreshToken) {
      return res.sendStatus(403);
    }

    jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET, (err, user) => {
      if (err) return res.sendStatus(403);
      console.log(user);
      const accessToken = generateAccessToken({ id: user.id });
      return res.json({ user, accessToken });
    });
  } catch (error) {
    console.log(error);
    return res.status(400).json({ success: false, message: error });
  }
};
