const User = require("../models/user");
const jwt = require("jsonwebtoken");
const expressJwt = require("express-jwt");

exports.signup = (req, res) => {
  const user = new User(req.body);
  user.save((err, user) => {
    if (err || !user) {
      return res.status(400).json({
        error: "Error is creating a new user",
      });
    }
    if (user) {
      const token = jwt.sign({ _id: user._id }, process.env.SECRET);

      // PUTTING TOKEN IN COOKIE
      res.cookie("token", token, { expire: new Date() + 3600000 });

      // SEND RESPONSE TO FRONTEND
      const { _id, username, email, fname } = user;
      return res.json({ token, user: { _id, username, email, fname } });
    }
  });
};
exports.signin = (req, res) => {
  const { email, password } = req.body;
  User.findOne({ email: email }, (err, user) => {
    if (err || !user) {
      return res.status(400).json({ error: "User not found in DB" });
    }

    if (!user.authenticate(password)) {
      return res.status(401).json({ error: "Password and email do not match" });
    }

    // SIGNING TOKEN TO AUTHENTICATE THROUGHOUT SESSION
    const token = jwt.sign({ _id: user._id }, process.env.SECRET);

    // PUTTING TOKEN IN COOKIE
    res.cookie("token", token, { expire: new Date() + 3600000 });

    // SEND RESPONSE TO FRONTEND
    const { _id, username, email, fname } = user;
    return res.json({ token, user: { _id, username, email, fname } });
  });
};

exports.isSignedIn = expressJwt({
  secret: "learncodeonline",
  requestProperty: "auth",
  algorithms: ["HS256"],
});

exports.signout = (req, res) => {
  // CLEARING THE COOKIE I.E SIGNOUT THE USER
  res.clearCookie("token");
  res.json({
    message: "User signout successfull",
  });
};
