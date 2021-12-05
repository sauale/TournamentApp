import axios from "axios";

export const addTournament = (newTournament, token) => {
  return axios
    .post(
      "/api/Tournaments",
      {
        name: newTournament.name,
        region: newTournament.region,
        format: newTournament.format,
        teamCount: newTournament.teamCount,
        map: newTournament.map,
        entryCost: newTournament.entryCost,
        prizePool: newTournament.prizePool,
      },
      {
        headers: {
          Authorization: "Bearer " + token,
        },
      }
    )
    .then((response) => {
      alert("Pridėta");
    });
};

export const deleteTournament = (id, token) => {
  return axios
    .delete("/api/Tournaments/" + id, {
      headers: {
        Authorization: "Bearer " + token,
      },
    })
    .then((response) => {
      alert("deleted");
    });
};

export const updateTournament = (newTournament, id, token) => {
  return axios
    .patch(
      "/api/Tournaments/" + id,
      {
        name: newTournament.name,
        region: newTournament.region,
        format: newTournament.format,
        teamCount: newTournament.teamCount,
        map: newTournament.map,
        entryCost: newTournament.entryCost,
        prizePool: newTournament.prizePool,
      },
      {
        headers: {
          Authorization: "Bearer " + token,
        },
      }
    )
    .then((response) => {
      alert("Updated");
    });
};
