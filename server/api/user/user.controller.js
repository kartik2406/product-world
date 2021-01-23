const { login, register } = require("./user.service");

const loignController = async (req, res, next) => {
  let loignDetails = req.body;
  try {
    let token = await login(loignDetails);
    res.status(200).send({ token });
  } catch (e) {
    // console.error(e.message);
    res.status(400).send({ error: e.message });
  }
};

const registercontroller = async (req, res, next) => {
  let user = req.body;
  //   console.log("req,", req.body);
  try {
    let savedUser = await register(user);
    res.status(201).send(savedUser);
  } catch (e) {
    // console.log(e.message);
    res.status(400).send({ error: e.message });
  }
};

module.exports = {
  loignController,
  registercontroller,
};
