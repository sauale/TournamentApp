import { useEffect, useState } from "react";
import axios from "axios";
import { Button, Table } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { deleteUser } from "./UsersFunctions";

import UserForm from "./UsersForm";

const UsersList = () => {
  const navigate = useNavigate();
  const [users, setUsers] = useState([]);
  const [isEdit, setIsEdit] = useState(false);
  const editUser = () => {
    setIsEdit(!isEdit);
  };

  useEffect(() => {
    const token = localStorage.usertoken;

    axios
      .get("/api/Users", {
        headers: {
          Authorization: "Bearer " + token,
        },
      })
      .then((response) => {
        const data = response.data;
        setUsers(data);
      })
      .catch(() => {
        alert("ERROR");
      });
  }, []);

  const onDeleteUser = (id) => {
    const token = localStorage.usertoken;
    deleteUser(id, token).then((res) => {
      window.location.reload();
    });
  };

  const onUpdateUser = (id, username, email, ip, role) => {
    navigate("/UserEditPage", {
      state: {
        id: id,
        username: username,
        email: email,
        ip: ip,
        role: role,
      },
    });
    console.log("click");
  };
  return (
    <div>
      <h1>Users List </h1>

      <Table table table-striped style={{ width: "70%" }}>
        <tr>
          <th> Id</th>
          <th> Username</th>
          <th> Email</th>
          <th> Ip</th>
          <th> Role</th>
          <th></th>
        </tr>

        {users.map((user) => (
          <tr>
            <td>
              <h3>{user._id}</h3>
            </td>
            <td>
              <h3>{user.username}</h3>
            </td>
            <td className="LeaderUser">
              <h3>{user.email}</h3>
            </td>
            <td className="LeaderUser">
              <h3>{user.ip}</h3>
            </td>
            <td className="LeaderUser">
              <h3>{user.role}</h3>
            </td>

            <td>
              <Button
                size="lg"
                variant="outline-warning"
                onClick={() =>
                  onUpdateUser(
                    user._id,
                    user.username,
                    user.email,
                    user.ip,
                    user.role
                  )
                }
              >
                Edit
              </Button>
            </td>
            <td>
              <Button
                size="lg"
                variant="outline-danger"
                onClick={() => onDeleteUser(user._id)}
              >
                Delete
              </Button>
            </td>
          </tr>
        ))}
      </Table>
    </div>
  );
};

export default UsersList;
