import React, { useState, useEffect } from "react";
import Paper from "@material-ui/core/Paper";
import Team from "./Team";
import AddIcon from "@material-ui/icons/Add";
import Button from "@material-ui/core/Button";
import CloseIcon from "@material-ui/icons/Close";
import IconButton from "@material-ui/core/IconButton";
import "./TeamsPage.css";
import MyTeam from "./MyTeam";
import axios from "axios";
import jwt_decode from "jwt-decode";
import MyTeamForm from "./MyTeamForm";
const MyTeamPage = () => {
  const [team, setTeam] = useState([]);
  const [ownsTeam, setOwnsTeam] = useState(true);
  const [isAddClicked, setIsAddClicked] = useState(false);

  const CreateProduct = () => {
    setIsAddClicked(true);
  };
  const onAddClose = () => {
    setIsAddClicked(false);
  };

  useEffect(() => {
    const token = localStorage.usertoken;
    console.log(token);
    const decoded = jwt_decode(token);
    let owner = true;
    let url = "/api/Teams/" + decoded._id;
    console.log(url);
    axios
      .post(url, { owner: owner })
      .then((response) => {
        const data = response.data;
        setTeam(data);
      })
      .catch(() => {
        setOwnsTeam(false);
      }, []);
  }, []);

  return (
    <div>
      {ownsTeam && (
        <Paper
          className="paper"
          elevation={3}
          style={{ display: "flex", flexDirection: "column" }}
        >
          <div className="centerAddNew">
            <h1>My team</h1>
          </div>

          <div
            style={{
              display: "flex",
              flexDirection: "row",
              padding: "50px",
            }}
          >
            <MyTeam
              id={team._id}
              name={team.name}
              region={team.region}
              members={team.members}
            ></MyTeam>
          </div>
        </Paper>
      )}

      {!ownsTeam && (
        <div style={{ textAlign: "center" }}>
          <h1 style={{ textAlign: "center" }}>You don't have a team</h1>
          <div className="centerAddNew" style={{ textAlign: "center" }}>
            <Button
              style={{ textAlign: "center" }}
              variant="contained"
              color="primary"
              className="addNew"
              endIcon={<AddIcon />}
              onClick={CreateProduct}
            >
              Create Team
            </Button>

            <div
              style={{
                textAlign: "center",
                maxWidth: "300px",
                display: isAddClicked ? "inline" : "none",
              }}
            >
              <IconButton aria-label="close" onClick={onAddClose}>
                <CloseIcon />
              </IconButton>
              {<MyTeamForm />}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MyTeamPage;
