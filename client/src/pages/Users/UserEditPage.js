import { useEffect } from "react";
import { propTypes } from "react-bootstrap/esm/Image";
import { useLocation } from "react-router-dom";
import UserForm from "./UsersForm";

const UserEditPage = (props) => {
  const { state } = useLocation();
  useEffect(() => {});

  return (
    <div>
      <h1>User edit page</h1>
      <UserForm
        username={state.username}
        email={state.email}
        role={state.role}
        id={state.id}
      />
    </div>
  );
};
export default UserEditPage;
