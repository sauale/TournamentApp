import React, { useEffect, useState } from "react";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import { addMatch, updateMatch } from "./MatchFunctions";
import "./MatchForm.css";

const TournamentForm = (props) => {
  const [tournamentId, setTournamentId] = useState("");
  const [team1, setTeam1] = useState("");
  const [team2, setTeam2] = useState("");
  const [score1, setScore1] = useState();
  const [score2, setScore2] = useState();
  const [winner, setWinner] = useState();
  const [matchLenght, setMatchLenght] = useState("");

  useEffect(() => {
    setTournamentId(props.tournamentId);
    setTeam1(props.team1);
    setTeam2(props.team2);
    setScore1(props.score1);
    setScore2(props.score2);
    setWinner(props.winner);
    setMatchLenght(props.matchLenght);
  }, []);

  console.log(props.tournamentId);

  const onSubmit = () => {
    const token = localStorage.usertoken;
    console.log(token);

    if (props.update == true) {
      const updatedMatch = {
        tournamentId: tournamentId,
        team1: team1,
        team2: team2,
        score1: score1,
        score2: score2,
        winner: winner,
        matchLenght: matchLenght,
      };

      updateMatch(updatedMatch, props.id, token).then((res) => {
        window.location.reload();
      });
    } else {
      const newMatch = {
        tournamentId: tournamentId,
        team1: team1,
        team2: team2,
        score1: score1,
        score2: score2,
        winner: winner,
        matchLenght: matchLenght,
      };

      addMatch(newMatch, token).then((res) => {
        console.log("ok");
        window.location.reload();
      });
    }
  };

  return (
    <div className="form">
      <form>
        <TextField
          className="textField"
          label="Team1"
          value={team1}
          onChange={(e) => setTeam1(e.target.value)}
        />
        <TextField
          className="textField"
          label="Team2"
          value={team2}
          onChange={(e) => setTeam2(e.target.value)}
        />
        <TextField
          className="textField"
          label="Score1"
          value={score1}
          onChange={(e) => setScore1(e.target.value)}
        />
        <TextField
          className="textField"
          label="Score2"
          value={score2}
          onChange={(e) => setScore2(e.target.value)}
        />
        <TextField
          className="textField"
          label="Winner"
          value={winner}
          onChange={(e) => setWinner(e.target.value)}
        />
        <TextField
          className="textField"
          label="Match Lenght"
          value={matchLenght}
          onChange={(e) => setMatchLenght(e.target.value)}
          multiline
        />

        <Button className="button" onClick={onSubmit}>
          Submit
        </Button>
      </form>
    </div>
  );
};

export default TournamentForm;
