import { useEffect, useState } from "react";
import jwt_decode from "jwt-decode";
const UsersLandingPage = () => {
  const [role, setRole] = useState();
  useEffect(() => {
    const token = localStorage.usertoken;
    const decoded = jwt_decode(token);
    setRole(decoded.role);
  }, []);

  return (
    <div>
      {role == "USER" && <h1>UserPage</h1>}
      {role == "ADMIN" && <h1>AdminPage</h1>}
    </div>
  );
};

export default UsersLandingPage;
