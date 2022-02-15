const express = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const createError = require("http-errors");
let Auth = express.Router({ mergeParams: true });

const User = require("../schemas/User");
let refreshTokens = [];
Auth.post("/login", async (req, res) => {
  const email = req.body.email;

  try {
    const foundUser = await User.findOne({ email });
    if (!foundUser) {
      console.log("nope");
      return res.status(401).end("User not found");
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
      refreshTokens.push(refreshToken);

      console.log(refreshTokens);

      return res.json({ accessToken: accessToken, refreshToken: refreshToken });
    } else {
      return res.status(401).end("Incorrect password");
    }
  } catch (e) {
    console.log(e);
    return res.status(500).send();
  }

  // const refreshToken = jwt.sign(payload, process.env.REFRESH_TOKEN_SECRET);

  // const accessTokenMaxAge = parseInt(process.env.ACCESS_TOKEN_EXPIRE_TIME, 10);
  // res.json(accessToken);
});

Auth.post("/token", (req, res) => {
  const refreshToken = req.body.token;

  console.log(req.body.token);
  if (refreshToken == null) return res.sendStatus(401);
  if (!refreshTokens.includes(refreshToken)) return res.sendStatus(403);

  jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET, (err, payload) => {
    if (err) return res.sendStatus(403);
    console.log(payload);
    const accessToken = jwt.sign(
      { _id: payload._id, role: payload.role },
      process.env.ACCESS_TOKEN_SECRET,
      {
        expiresIn: "3000s",
      }
    );
    res.json({ accessToken: accessToken });
  });
});

Auth.delete("/logout", (req, res) => {
  refreshTokens = refreshTokens.filter((token) => token !== req.body.token);
  res.sendStatus(204);
});

module.exports = Auth;
