import React, { useState, useEffect } from "react";
import Paper from "@material-ui/core/Paper";
import { makeStyles } from "@material-ui/core/styles";
import List from "@material-ui/core/List";
import Button from "@material-ui/core/Button";
import axios from "axios";
import { Link, useParams } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
    maxWidth: "100ch",
    backgroundColor: theme.palette.background.paper,
    margin: "auto",
  },
  ProductWrapper: {
    paddingBottom: "30px",
    paddingTop: "30px",
    maxWidth: "700px",
    margin: "auto",
  },
  ProductInfoWrap: {
    textAlign: "left",
  },
}));
const TournamentDetails = (props) => {
  const classes = useStyles();
  const [tournament, setTournament] = useState([]);
  const { id } = useParams();
  useEffect(() => {
    console.log(id);
    let url = "/api/Tournaments/" + id;
    console.log(url);
    axios
      .get(url)
      .then((response) => {
        const data = response.data;
        setTournament(data);
      })
      .catch(() => {
        alert("ERROR");
      }, []);
  }, []);

  return (
    <div>
      <h1>TournamentDetail</h1>
      <Paper elevation={0}>
        <Paper elevation={1}>
          <div className={classes.ProductWrapper}>
            <h1>Tournament ID: {id}</h1>
            <h2>Name: {tournament.name}</h2>
            <h3>Region: {tournament.region}</h3>
            <h3>Date: {tournament.date} </h3>
            <h3>Format: {tournament.format}</h3>
            <h3>Team Count: {tournament.teamCount}</h3>
            <h3>Map: {tournament.map} </h3>
            <h3>Entry Cost: {tournament.entryCost} </h3>
            <h3>Prize Pool: {tournament.prizePool} </h3>
          </div>
        </Paper>
      </Paper>
    </div>
  );
};
export default TournamentDetails;
