import React, { useEffect, useState } from "react";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import { updateUser } from "./UsersFunctions";
import "./UserForm.css";
const UserForm = (props) => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [role, setRole] = useState("");

  useEffect(() => {
    setUsername(props.username);
    setEmail(props.email);
    setRole(props.role);
  }, []);

  const onSubmit = () => {
    const token = localStorage.usertoken;
    console.log(token);
    const updatedUser = {
      username: username,
      email: email,
      role: role,
    };

    updateUser(updatedUser, props.id, token).then((res) => {
      window.location.reload();
    });
  };

  return (
    <div className="form">
      <form>
        <TextField
          className="textField"
          label="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <TextField
          className="textField"
          label="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <TextField
          className="textField"
          label="Role"
          value={role}
          onChange={(e) => setRole(e.target.value)}
        />

        <Button className="button" onClick={onSubmit}>
          Submit
        </Button>
      </form>
    </div>
  );
};

export default UserForm;
