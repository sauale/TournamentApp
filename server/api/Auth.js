const express = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const createError = require("http-errors");
let Auth = express.Router({ mergeParams: true });

const User = require("../schemas/User");

const cors = require("cors");
const mongoose = require("mongoose");

const UserRole = require("../userRole");

Auth.post("/login", async (req, res) => {
  const email = req.body.email;

  try {
    const foundUser = await User.findOne({ email });
    if (!foundUser) {
      return res.status(400).end("User not found");
    }
    if (await bcrypt.compare(req.body.password, foundUser.password)) {
      const payload = {
        _id: foundUser._id,
        role: foundUser.role,
      };

      const accessToken = jwt.sign(payload, process.env.ACCESS_TOKEN_SECRET, {
        expiresIn: "3000s",
      });
      const refreshToken = jwt.sign(payload, process.env.REFRESH_TOKEN_SECRET);

      return res.json({ accessToken: accessToken, refreshToken: refreshToken });
    } else {
      return res.send("Incorrect password");
    }
  } catch (e) {
    console.log(e);
    return res.status(500).send();
  }

  // const refreshToken = jwt.sign(payload, process.env.REFRESH_TOKEN_SECRET);

  // const accessTokenMaxAge = parseInt(process.env.ACCESS_TOKEN_EXPIRE_TIME, 10);
  // res.json(accessToken);
});

module.exports = Auth;
