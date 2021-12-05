import React, { useEffect, useState } from "react";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import { addTeam, updateTeam } from "./TeamFunctions";
import jwt_decode from "jwt-decode";
import "./MyTeamForm.css";

const TeamForm = (props) => {
  const [ownerId, setOwnerId] = useState("");
  const [name, setName] = useState("");
  const [region, setRegion] = useState("");
  const [members, setMembers] = useState([]);

  useEffect(() => {
    setOwnerId(props.ownerId);
    setName(props.name);
    setRegion(props.region);
    setMembers(props.members);
  }, []);

  const onSubmit = () => {
    const token = localStorage.usertoken;
    console.log(token);
    const decoded = jwt_decode(token);
    if (props.update == true) {
      const updatedTeam = {
        name: name,
        region: region,
      };

      updateTeam(updatedTeam, props.id, token).then((res) => {
        window.location.reload();
      });
    } else {
      const newTeam = {
        ownerId: ownerId,
        name: name,
        region: region,
        members: members,
      };

      addTeam(newTeam, token).then((res) => {
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
          label="Team name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <TextField
          className="textField"
          label="Region"
          value={region}
          onChange={(e) => setRegion(e.target.value)}
        />

        <Button className="button" onClick={onSubmit}>
          Submit
        </Button>
      </form>
    </div>
  );
};

export default TeamForm;
