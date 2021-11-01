const express = require("express");
let Users = express.Router({ mergeParams: true });

const cors = require("cors");
const mongoose = require("mongoose");

require("../schemas/User");
const UserModel = mongoose.model("User");

Users.use(cors());

Users.get("/", (req, res) => {
  UserModel.find({})
    .then((users) => {
      return res.status(200).json(users);
    })
    .catch(() => next({ status: 404, message: "404 NOT FOUND" }));
});

Users.get("/:id", (req, res) => {
  UserModel.findOne({ _id: req.params.id })
    .lean()
    .exec()
    .then((user) => {
      if (!user) return res.status(404).end("404 User does not exist ");

      return res.status(200).json(user);
    });
});
Users.post("/", (req, res) => {
  const User = new UserModel({
    email: req.body.email,
    password: req.body.password,
    ip: req.body.ip,
    role: req.body.role,
  });
  User.save((err) => {
    if (err) {
      return res.status(400).end("400 BAD REQUEST");
    }
    return res.status(201).json(User);
  });
});

Users.patch("/:id", (req, res) => {
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
});
Users.delete("/:id", (req, res) => {
  UserModel.findOne({ _id: req.params.id }, (err, user) => {
    if (err) return res.status(500).end("Internal Server Error");
    if (!user) return res.status(404).end("User does not exists.");

    user.delete();

    return res.status(204).end("User Deleted");
  });
});

module.exports = Users;
