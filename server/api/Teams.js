const express = require("express");
const Teams = express.Router();
const cors = require("cors");
const mongoose = require("mongoose");
const auth = require("../middleware/authMiddleware");
const userRole = require("../userRole");
const app = express();

require("../schemas/Team");
const TeamModel = mongoose.model("Team");

Teams.use(cors());

Teams.get("/", (req, res) => {
  TeamModel.find()
    .then((teams) => {
      return res.status(200).json(teams);
    })
    .catch(() => next({ status: 404, message: "404 NOT FOUND" }));
});

Teams.get("/:id", (req, res) => {
  TeamModel.findOne({ _id: req.params.id })
    .lean()
    .exec()
    .then((team) => {
      if (!team) return res.status(404).end("404 Team does not exist ");

      return res.status(200).json(team);
    });
});

Teams.post("/:id", (req, res) => {
  console.log("click");
  TeamModel.findOne({ ownerId: req.params.id })
    .lean()
    .exec()
    .then((team) => {
      if (!team) return res.status(404).end("404 Team does not exist ");

      return res.status(200).json(team);
    });
});
Teams.post("/", auth([userRole.USER]), (req, res) => {
  const Team = new TeamModel({
    ownerId: req.payload._id,
    name: req.body.name,
    region: req.body.region,
    members: req.body.members,
  });

  Team.save((err) => {
    if (err) {
      console.log(err);
      return res.status(400).end("400 BAD REQUEST");
    }
    return res.status(201).json(Team);
  });
});

Teams.patch("/:id", auth([userRole.USER]), (req, res) => {
  TeamModel.findOne({ _id: req.params.id }, (err, team) => {
    if (!team) return res.status(404).end("Team does not exists.");
    if (req.payload.role === "USER" && req.payload._id != team.ownerId) {
      res.sendStatus(403);
    }

    if (err) return res.status(500).end("Internal Server Error");

    team.name = req.body.name || team.name;
    team.region = req.body.region || team.region;
    team.members = req.body.members || team.members;

    team.save((err) => {
      if (err) {
        return res.status(400).end("400 BAD REQUEST");
      }
      return res.status(200).json(team);
    });
  });
});
Teams.delete("/:id", auth([userRole.ADMIN, userRole.USER]), (req, res) => {
  TeamModel.findOne({ _id: req.params.id }, (err, team) => {
    if (!team) return res.status(404).end("Team does not exists.");
    if (req.payload.role === "USER" && req.payload._id != team.ownerId) {
      res.sendStatus(403);
    }
    if (err) return res.status(500).end("Internal Server Error");

    team.delete();

    return res.status(204).end("Team Deleted");
  });
});

module.exports = Teams;
