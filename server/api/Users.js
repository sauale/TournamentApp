const express = require("express");
let Users = express.Router({ mergeParams: true });
const auth = require("../middleware/authMiddleware");
const cors = require("cors");
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
require("../schemas/User");
const UserModel = mongoose.model("User");
const userRole = require("../userRole");
Users.use(cors());

Users.get("/", auth([userRole.ADMIN]), (req, res) => {
  UserModel.find({})
    .then((users) => {
      return res.status(200).json(users);
    })
    .catch(() => next({ status: 404, message: "404 NOT FOUND" }));
});

Users.get("/:id", (req, res) => {
  console.log(req.payload);

  UserModel.findOne({ _id: req.params.id })
    .lean()
    .exec()
    .then((user) => {
      if (!user) return res.status(404).end("404 User does not exist ");

      return res.status(200).json(user);
    });
});
Users.post("/", async (req, res) => {
  try {
    const hashedPassword = await bcrypt.hash(req.body.password, 10);

    const User = new UserModel({
      email: req.body.email,
      password: hashedPassword,
      ip: req.body.ip,
      role: req.body.role,
    });
    User.save((err) => {
      if (err) {
        return res.status(400).end("400 BAD REQUEST");
      }
      return res.status(201).json(User);
    });
  } catch {
    res.status(500);
  }
});

Users.patch("/:id", auth([userRole.ADMIN, userRole.USER]), (req, res) => {
  if (req.payload.role === "USER" && req.payload._id != req.params.id) {
    res.sendStatus(403);
  } else {
    UserModel.findOne({ _id: req.params.id }, (err, user) => {
      if (err) return res.status(500).end("Internal Server Error");
      if (!user) return res.status(404).end("User does not exists.");

      user.email = req.body.email || user.email;
      user.password = req.body.password || user.password;
      user.ip = req.body.ip || user.ip;
      user.role = req.body.role || user.role;

      user.save((err) => {
        if (err) {
          return res.status(400).end("400 BAD REQUEST");
        }
        return res.status(200).json(user);
      });
    });
  }
});
Users.delete("/:id", auth([userRole.ADMIN, userRole.USER]), (req, res) => {
  if (req.payload.role === "USER" && req.payload._id != req.params.id) {
    res.sendStatus(403);
  }
  UserModel.findOne({ _id: req.params.id }, (err, user) => {
    if (err) return res.status(500).end("Internal Server Error");
    if (!user) return res.status(404).end("User does not exists.");

    user.delete();

    return res.status(204).end("User Deleted");
  });
});

module.exports = Users;
