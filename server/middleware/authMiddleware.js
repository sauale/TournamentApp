const jwt = require("jsonwebtoken");

const authenticateToken = (roles = []) => {
  return (req, res, next) => {
    const authHeader = req.headers["authorization"];
    console.log(authHeader);
    const token = authHeader && authHeader.split(" ")[1];
    if (token == null) return res.sendStatus(401);
    console.log(token);
    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, payload) => {
      if (err) {
        console.log(err);
        return res.sendStatus(403);
      }
      req.payload = payload;
      const userRole = req.payload.role;
      console.log(roles);
      if (!roles.includes(userRole)) {
        res.send("Access denied");
      }

      next();
    });
  };
};

module.exports = authenticateToken;
