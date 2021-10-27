const express = require("express");
const Matches = express.Router();
const cors = require("cors");
const mongoose = require("mongoose");

require("../schemas/Match");
const MatchModel = mongoose.model("Match");

Matches.use(cors());

Matches.get("/", (req, res) => {
  MatchModel.find()
    .then((matches) => {
      return res.status(200).json(matches);
    })
    .catch(() => next({ status: 404, message: "404 NOT FOUND" }));
});

Matches.get("/:id", (req, res) => {
  MatchModel.findOne({ id: req.params.id })
    .lean()
    .exec()
    .then((match) => {
      if (!match) return res.status(404).end("404 Match does not exist ");

      return res.status(200).json(match);
    });
});
Matches.post("/", (req, res) => {
  console.log(req.body.id);
  const Match = new MatchModel({
    id: req.body.id,
    tournamentId: req.body.tournamentId,
    team1: req.body.team1,
    team2: req.body.team2,
    winner: req.body.winner,
    matchLenght: req.body.matchLenght,
  });

  Match.save((err) => {
    if (err) {
      console.log(err);
      return res.status(400).end("400 BAD REQUEST");
    }
    return res.status(201).json(Match);
  });
});

Matches.patch("/:id", (req, res) => {
  MatchModel.findOne({ id: req.params.id }, (err, match) => {
    if (err) return res.status(500).end("Internal Server Error");
    if (!match) return res.status(404).end("Match does not exists.");

    match.team1 = req.body.team1 || match.team1;
    match.team2 = req.body.team2 || match.team2;
    match.winner = req.body.winner || match.winner;
    match.matchLenght = req.body.matchLenght || match.matchLenght;

    match.save((err) => {
      if (err) {
        return res.status(400).end("400 BAD REQUEST");
      }
      return res.status(200).json(match);
    });
  });
});
Matches.delete("/:id", (req, res) => {
  MatchModel.findOne({ id: req.params.id }, (err, match) => {
    if (err) return res.status(500).end("Internal Server Error");
    if (!match) return res.status(404).end("Match does not exists.");

    match.delete();

    return res.status(204).end("Match Deleted");
  });
});

module.exports = Matches;
