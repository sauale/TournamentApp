import { useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";
import Match from "./Match";
import MatchForm from "./MatchForm";
import AddIcon from "@material-ui/icons/Add";
import Button from "@material-ui/core/Button";
import CloseIcon from "@material-ui/icons/Close";
import IconButton from "@material-ui/core/IconButton";
const MatchesPage = (props) => {
  const [isAddClicked, setIsAddClicked] = useState(false);

  const onAddClose = () => {
    setIsAddClicked(false);
  };
  const CreateProduct = () => {
    setIsAddClicked(true);
  };
  const { state } = useLocation();

  const [matches, setMatches] = useState([]);

  useEffect(() => {
    axios
      .get("/api/tournaments/" + state.id + "/matches")
      .then((response) => {
        const data = response.data;
        setMatches(data);
      })
      .catch(() => {
        alert("ERROR");
      });
  }, []);

  console.log(matches);

  return (
    <div>
      <h1>{state.name} matches</h1>
      {props.role == "ADMIN" && (
        <Button
          style={{ marginLeft: "80px", marginBottom: "10px" }}
          variant="contained"
          color="primary"
          className="addNew"
          endIcon={<AddIcon />}
          onClick={CreateProduct}
        >
          Add New
        </Button>
      )}

      <div
        style={{
          marginLeft: "20px",
          maxWidth: "300px",
          display: isAddClicked ? "block" : "none",
        }}
      >
        <IconButton aria-label="close" onClick={onAddClose}>
          <CloseIcon />
        </IconButton>
        {<MatchForm tournamentId={state.id} />}
      </div>
      {matches.map((match) => (
        <Match
          tournamentId={state.id}
          id={match._id}
          team1={match.team1}
          team2={match.team2}
          score1={match.score1}
          score2={match.score2}
          winner={match.winner}
          matchLenght={match.matchLenght}
          role={props.role}
        />
      ))}
    </div>
  );
};
export default MatchesPage;
