const express = require("express");
let Matches = express.Router({ mergeParams: true });

const cors = require("cors");
const mongoose = require("mongoose");

const auth = require("../middleware/authMiddleware");
const userRole = require("../userRole");

require("../schemas/Match");
const MatchModel = mongoose.model("Match");

Matches.use(cors());

Matches.get("/", (req, res) => {
  MatchModel.find({ tournamentId: req.params.id })
    .then((matches) => {
      return res.status(200).json(matches);
    })
    .catch(() => next({ status: 404, message: "404 NOT FOUND" }));
});

Matches.get("/:matchId", (req, res) => {
  MatchModel.findOne({ _id: req.params.matchId, tournamentId: req.params.id })
    .lean()
    .exec()
    .then((match) => {
      if (!match) return res.status(404).end("404 Match does not exist ");

      return res.status(200).json(match);
    });
});
Matches.post("/", auth([userRole.ADMIN]), (req, res) => {
  const Match = new MatchModel({
    tournamentId: req.params.id,
    team1: req.body.team1,
    team2: req.body.team2,
    score1: req.body.score1,
    score2: req.body.score2,
    winner: req.body.winner,
    matchLenght: req.body.matchLenght,
  });

  Match.save((err) => {
    if (err) {
      return res.status(400).end("400 BAD REQUEST");
    }
    return res.status(201).json(Match);
  });
});

Matches.patch("/:matchId", auth([userRole.ADMIN]), (req, res) => {
  MatchModel.findOne(
    { _id: req.params.matchId, tournamentId: req.params.id },
    (err, match) => {
      if (err) return res.status(500).end("Internal Server Error");
      if (!match) return res.status(404).end("Match does not exists.");

      match.team1 = req.body.team1 || match.team1;
      match.team2 = req.body.team2 || match.team2;
      match.score1 = req.body.score1 || match.score1;
      match.score2 = req.body.score2 || match.score2;
      match.winner = req.body.winner || match.winner;
      match.matchLenght = req.body.matchLenght || match.matchLenght;

      match.save((err) => {
        if (err) {
          return res.status(400).end("400 BAD REQUEST");
        }
        return res.status(200).json(match);
      });
    }
  );
});
Matches.delete("/:matchId", auth([userRole.ADMIN]), (req, res) => {
  MatchModel.findOne(
    { _id: req.params.matchId, tournamentId: req.params.id },
    (err, match) => {
      if (err) return res.status(500).end("Internal Server Error");
      if (!match) return res.status(404).end("Match does not exists.");

      match.delete();

      return res.status(204).end("Match Deleted");
    }
  );
});

module.exports = Matches;
