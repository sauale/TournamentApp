import React, { useEffect, useState } from "react";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import { addTournament, updateTournament } from "./TournamentFunctions";
import "./TournamentForm.css";

const TournamentForm = (props) => {
  const [name, setName] = useState("");
  const [region, setRegion] = useState("");
  const [format, setFormat] = useState("");
  const [teamCount, setTeamCount] = useState();
  const [map, setMap] = useState("");
  const [entryCost, setEntryCost] = useState();
  const [prizePool, setPrizePool] = useState();

  useEffect(() => {
    setName(props.name);
    setRegion(props.region);
    setFormat(props.format);
    setTeamCount(props.teamCount);
    setMap(props.map);
    setEntryCost(props.entryCost);
    setPrizePool(props.prizePool);
  }, []);

  const onSubmit = () => {
    const token = localStorage.usertoken;
    console.log(token);

    if (props.update == true) {
      const updatedTournament = {
        name: name,
        region: region,
        format: format,
        teamCount: teamCount,
        map: map,
        entryCost: entryCost,
        prizePool: prizePool,
      };

      updateTournament(updatedTournament, props.id, token).then((res) => {
        window.location.reload();
      });
    } else {
      const newTournament = {
        name: name,
        region: region,
        format: format,
        teamCount: teamCount,
        map: map,
        entryCost: entryCost,
        prizePool: prizePool,
      };

      addTournament(newTournament, token).then((res) => {
        console.log("ok");
      });
    }
  };

  return (
    <div className="form">
      <form>
        <TextField
          className="textField"
          label="Tournament Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <TextField
          className="textField"
          label="Region"
          value={region}
          onChange={(e) => setRegion(e.target.value)}
        />
        <TextField
          className="textField"
          label="Format"
          value={format}
          onChange={(e) => setFormat(e.target.value)}
        />
        <TextField
          className="textField"
          label="Team Count"
          value={teamCount}
          onChange={(e) => setTeamCount(e.target.value)}
        />
        <TextField
          className="textField"
          label="Map"
          value={map}
          onChange={(e) => setMap(e.target.value)}
          multiline
        />
        <TextField
          className="textField"
          label="Entry Cost"
          value={entryCost}
          onChange={(e) => setEntryCost(e.target.value)}
        />
        <TextField
          className="textField"
          label="Prize pool"
          value={prizePool}
          onChange={(e) => setPrizePool(e.target.value)}
        />

        <Button className="button" onClick={onSubmit}>
          Submit
        </Button>
      </form>
    </div>
  );
};

export default TournamentForm;
