const express = require("express");
const Tournaments = express.Router();
const cors = require("cors");
const mongoose = require("mongoose");
const app = express();

require("../schemas/Tournament");

const TournamentModel = mongoose.model("Tournament");

Tournaments.use(cors());

Tournaments.get("/", (req, res) => {
  TournamentModel.find()
    .then((tournaments) => {
      return res.status(200).json(tournaments);
    })
    .catch(() => next({ status: 404, message: "404 NOT FOUND" }));
});

Tournaments.get("/:id", (req, res) => {
  TournamentModel.findOne({ _id: req.params.id })
    .lean()
    .exec()
    .then((tournament) => {
      if (!tournament)
        return res.status(404).end("404 Tournament does not exist ");

      return res.status(200).json(tournament);
    });
});

Tournaments.post("/", (req, res) => {
  const Tournament = new TournamentModel({
    name: req.body.name,
    region: req.body.region,
    date: Date(),
    format: req.body.format,
    teamCount: req.body.teamCount,
    map: req.body.map,
    entryCost: req.body.entryCost,
    prizePool: req.body.prizePool,
  });
  Tournament.save((err) => {
    if (err) {
      console.log(err);
      return res.status(400).end("400 BAD REQUEST");
    }
    return res.status(201).json(Tournament);
  });
});

Tournaments.patch("/:id", (req, res) => {
  TournamentModel.findOne({ _id: req.params.id }, (err, tournament) => {
    if (err) return res.status(500).end("Internal Server Error");
    if (!tournament) return res.status(404).end("Tournament does not exists.");

    tournament.name = req.body.name || tournament.name;
    tournament.region = req.body.region || tournament.region;
    (tournament.date = Date()),
      (tournament.format = req.body.format || tournament.format);
    tournament.teamCount = req.body.teamCount || tournament.teamCount;
    tournament.map = req.body.map || tournament.map;
    tournament.entryCost = req.body.entryCost || tournament.entryCost;
    tournament.prizePool = req.body.prizePool || tournament.prizePool;

    tournament.save((err) => {
      if (err) {
        return res.status(400).end("400 BAD REQUEST");
      }
      return res.status(200).json(tournament);
    });
  });
});
Tournaments.delete("/:id", (req, res) => {
  TournamentModel.findOne({ _id: req.params.id }, (err, tournament) => {
    if (err) return res.status(500).end("Internal Server Error");
    if (!tournament) return res.status(404).end("Tournament does not exists.");

    tournament.delete();

    return res.status(204).end("Tournament Deleted");
  });
});

module.exports = Tournaments;
