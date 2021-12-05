import axios from "axios";

export const addTeam = (newTeam, token) => {
  return axios
    .post(
      "/api/Teams",
      {
        ownerId: newTeam.ownerId,
        name: newTeam.name,
        region: newTeam.region,
        members: newTeam.members,
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

export const deleteTeam = (id, token) => {
  return axios
    .delete("/api/Teams/" + id, {
      headers: {
        Authorization: "Bearer " + token,
      },
    })
    .then((response) => {
      alert("deleted");
    });
};

export const updateTeam = (newTeam, id, token) => {
  return axios
    .patch(
      "/api/Teams/" + id,
      {
        name: newTeam.name,
        region: newTeam.region,
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
