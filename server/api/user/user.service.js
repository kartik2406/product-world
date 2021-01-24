const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const saltRounds = process.env.SALT_ROUNDS || 10;
const SECRET = process.env.SECRET || "SECRET";
const UserModel = require("./user.model");

const login = async (loignDetails) => {
  try {
    let user = await UserModel.findByName(loignDetails.username);
    if (!user) throw new Error("User does not exists");
    let isPasswordCorrect = await bcrypt.compare(
      loignDetails.password,
      user.password
    );
    if (!isPasswordCorrect) throw new Error("Username or password is invalid");
    // console.log("User", user);
    let token = jwt.sign(
      {
        id: user._id,
        username: user.username,
        role: user.role || "USER",
      },
      SECRET
    );
    return token;
  } catch (e) {
    throw new Error(e.message);
  }
};

const register = async (userDetails) => {
  try {
    let user = await UserModel.findByName(userDetails.username);
    // console.log("**** user", user);
    if (user) throw new Error("User already exists");

    const salt = await bcrypt.genSalt(saltRounds);
    userDetails.password = await bcrypt.hash(userDetails.password, salt);
    let newUser = new UserModel(userDetails);
    let storedDetails = await newUser.save();
    return {
      id: storedDetails.id,
      username: storedDetails.username,
    };
  } catch (e) {
    throw new Error(e.message);
  }
};
module.exports = {
  login,
  register,
};
