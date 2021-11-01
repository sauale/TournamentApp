const express = require("express");

const jwt = require("jsonwebtoken");
const createError = require("http-errors");
let Auth = express.Router({ mergeParams: true });

const User = require("../schemas/User");

const cors = require("cors");
const mongoose = require("mongoose");

const UserRole = require("../userRole");

Auth.post("/login", async (req, res) => {
  const email = req.body.email;
  const password = req.body.password;

  const foundUser = await User.findOne({ email, password });
  if (!foundUser) {
    return res.status(404).end("User not found");
  }
  const payload = {
    _id: foundUser._id,
    role: foundUser.role,
  };

  const accessToken = jwt.sign(payload, process.env.ACCESS_TOKEN_SECRET);
  const refreshToken = jwt.sign(payload, process.env.REFRESH_TOKEN_SECRET);

  const accessTokenMaxAge = parseInt(process.env.ACCESS_TOKEN_EXPIRE_TIME, 10);

  res
    .cookie("access-token", accessToken, {
      httpOnly: true,
      maxAge: accessTokenMaxAge,
    })
    .set("cookie set");

  // res.json(accessToken);
});
module.exports = Auth;
