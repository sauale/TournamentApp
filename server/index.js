require("dotenv").config();

const express = require("express");
const path = require("path");
const mongoose = require("mongoose");

var cors = require("cors");
const PORT = process.env.PORT || 3001;

const app = express();
app.use(cors());
app.use(express.static(path.resolve(__dirname, "../client/build")));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
const mongoURI =
  "mongodb+srv://admin:admin@cluster0.vxblh.mongodb.net/TournamentApp";

mongoose
  .connect(mongoURI, { useNewUrlParser: true })
  .then(() => console.log("MongoDB Connected"))
  .catch((err) => console.log(err));

let Tournaments = require("./api/Tournaments");
app.use("/api/tournaments", Tournaments);

let Teams = require("./api/Teams");
app.use("/api/teams", Teams);

let Matches = require("./api/Matches");
app.use("/api/tournaments/:id/matches", Matches);

let Users = require("./api/Users");
app.use("/api/users", Users);

let Auth = require("./api/Auth");
app.use("/api/auth", Auth);

app.get("/api", (req, res) => {
  res.json({ message: "Tournament App " });
});
app.get("/api/*", (req, res) => {
  res.status(404).end("404 not found");
});

app.get("*", (req, res) => {
  res.sendFile(path.resolve(__dirname, "../client/build", "index.html"));
});

app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});
