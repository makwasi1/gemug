const JWT = require("jsonwebtoken");
require("dotenv").config();

//genarate token and retuen it
module.exports = {
  signToken: (user) => {
    //dont use passowrd and other sensitive data to validate
    if (!user) return null;

    const token = {
      userId: user.userId,
      email: user.email,
      username: user.username,
    };
    return JWT.sign(token, process.env.JWT_SECRET, {
      expiresIn: 60 * 60,
    });
  },

  authentcate: (req, res, next) => {
    const header = res.header["authorization"];
    if (!header) {
      res
        .status(400)
        .json({ success: false, Error: "Authorization header is missing" });
    }

    if (header.startsWith("Bearer")) {
      //extract the token from header
      const token = header.split(" ")[1];
      JWT.verify(token, process.env.JWT_SECRET, (err, authData) => {
        if (err) {
          res.status(400).json({ Error: "invalid token" });
        } else {
          next();
        }
      });
      // return error is malforned header
    } else {
      res.status(403).json({ Error: "Authorization header is malformed" });
    }
  },
};
