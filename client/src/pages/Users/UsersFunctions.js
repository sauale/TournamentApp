import axios from "axios";

export const deleteUser = (id, token) => {
  return axios
    .delete("/api/Users/" + id, {
      headers: {
        Authorization: "Bearer " + token,
      },
    })
    .then((response) => {
      alert("deleted");
    });
};

export const updateUser = (newUser, id, token) => {
  return axios
    .patch(
      "/api/Users/" + id,
      {
        username: newUser.username,
        email: newUser.email,
        role: newUser.role,
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
