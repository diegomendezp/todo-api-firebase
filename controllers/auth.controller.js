const firebase = require("../config/firebase.config");
const User = require("../models/User.model");

module.exports.signUp = async (req, res, next) => {
  try {
    const newUser = await firebase.auth().createUser(req.body);
    console.log(newUser);
    const user = await User.create({ ...newUser, firebase_id: newUser.uid });
    return res.status(200).json(user);
  } catch(err) {
    return res.status(500).json(err);
  }
}