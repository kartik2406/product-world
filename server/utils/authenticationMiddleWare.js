const jwt = require("jsonwebtoken");

function authenticateUser(req, res, next) {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];
  console.log("**** token", token);
  if (token == null) return res.sendStatus(401);
  jwt.verify(token, process.env.SECRET || "SECRET", (err, user) => {
    // console.log(err);
    if (err) return res.sendStatus(401);
    req.user = user;
    console.log("User ", req.user);
    next();
  });
}

module.exports = {
  authenticateUser,
};
