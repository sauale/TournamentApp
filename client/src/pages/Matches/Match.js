import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { Button, Table } from "react-bootstrap";
import MatchForm from "./MatchForm";
import { deleteMatch } from "./MatchFunctions";
const Match = (props) => {
  const [isEdit, setIsEdit] = useState(false);
  const [deleted, setDeleted] = useState(false);
  const EditMatch = () => {
    setIsEdit(!isEdit);
  };

  const DeleteMatch = (tournamentId, id) => {
    const token = localStorage.usertoken;
    setDeleted(true);
    deleteMatch(tournamentId, id, token).then((res) => {
      window.location.reload();
    });
  };
  return (
    <div>
      <Link
        to={"/Tournaments/"}
        style={{ textDecoration: "none", color: "black" }}
      >
        <div style={{ marginLeft: "20px" }}>
          <div
            style={{
              width: "100px",
              textAlign: "right",
              display: "inline-block",
            }}
          >
            <h3
              style={{
                display: "inline-block",
                marginRight: "10px",
                opacity: props.team1 === props.winner ? "100%" : "50%",
              }}
            >
              {props.team1}{" "}
            </h3>
          </div>
          <div style={{ width: "45px", display: "inline-block" }}>
            <h3 style={{ display: "inline-block", marginRight: "10px" }}>
              {" "}
              {props.score1}:{props.score2}
            </h3>
          </div>
          <h3
            style={{
              display: "inline-block",
              marginRight: "10px",
              opacity: props.team2 === props.winner ? "100%" : "50%",
            }}
          >
            {props.team2}
          </h3>
        </div>
      </Link>
      <div style={{ marginLeft: "60px" }}>
        {props.role == "ADMIN" && (
          <Button
            style={{ display: "inline-block" }}
            size="lg"
            variant="outline-warning"
            onClick={EditMatch}
          >
            Edit
          </Button>
        )}
        {props.role == "ADMIN" && (
          <Button
            style={{ display: "inline-block" }}
            size="lg"
            variant="outline-danger"
            onClick={() => DeleteMatch(props.tournamentId, props.id)}
          >
            Delete
          </Button>
        )}
      </div>

      <div style={{ display: isEdit ? "block" : "none" }}>
        <MatchForm
          update={true}
          id={props.id}
          tournamentId={props.tournamentId}
          team1={props.team1}
          team2={props.team2}
          score1={props.score1}
          score2={props.score2}
          winner={props.winner}
          matchLenght={props.matchLenght}
        />
      </div>
    </div>
  );
};
export default Match;
