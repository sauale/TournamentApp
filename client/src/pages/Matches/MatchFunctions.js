import axios from "axios";

export const addMatch = (newMatch, token) => {
  console.log(newMatch.tournamentId);
  return axios
    .post(
      "/api/tournaments/" + newMatch.tournamentId + "/matches",
      {
        team1: newMatch.team1,
        team2: newMatch.team2,
        score1: newMatch.score1,
        score2: newMatch.score2,
        winner: newMatch.winner,
        matchLenght: newMatch.matchLenght,
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

export const updateMatch = (newMatch, id, token) => {
  return axios
    .patch(
      "/api/tournaments/" + newMatch.tournamentId + "/matches/" + id,
      {
        team1: newMatch.team1,
        team2: newMatch.team2,
        score1: newMatch.score1,
        score2: newMatch.score2,
        winner: newMatch.winner,
        matchLenght: newMatch.matchLenght,
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

export const deleteMatch = (tournamentId, id, token) => {
  return axios
    .delete("/api/tournaments/" + tournamentId + "/matches/" + id, {
      headers: {
        Authorization: "Bearer " + token,
      },
    })
    .then((response) => {
      alert("deleted");
    });
};
