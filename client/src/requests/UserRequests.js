import axios from "axios";

export const login = (user) => {
  return axios
    .post("/api/Auth/login", {
      email: user.email,
      password: user.password,
    })
    .then((response) => {
      if (response.data == "z") {
      } else {
        localStorage.setItem("usertoken", response.data.accessToken);
        return response.data;
      }
    })
    .catch((err) => {
      console.log(err);
    });
};

export const register = (newUser) => {
  return axios
    .post("/api/Users", {
      username: newUser.username,
      email: newUser.email,
      ip: "66.00.00",
      password: newUser.password,
      role: "USER",
    })
    .then((response) => {
      return response;
    })
    .catch((err) => {
      console.log(err);
    });
};
