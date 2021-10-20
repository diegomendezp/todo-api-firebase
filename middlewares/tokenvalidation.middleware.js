const firebase = require("../config/firebase.config");

const validateFirebaseToken = async (token) =>{
  return await firebase.auth().verifyIdToken(token);
}

const removeBearer = (token) => token.substring(7, token.length);

module.exports.validateToken = async (req, res, next) => {
  const { authorization } = req.headers;
  if(authorization){
    try {
      console.log(authorization);
      const user = await validateFirebaseToken(removeBearer(authorization));
      console.log(user);
      req.user = { firebase_id: user.uid, email: user.email };
      next();
      return

    } catch(err){
      return res.status(401).json(err);
    }
  }
  return res.status(401).json({ message: "Unauthorized"});
}