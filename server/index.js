const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const userRouter = require("./routes/users");
const cookieSession = require("cookie-session");
const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth20").Strategy;
const User = require("./models/User");
require("./config");
require("dotenv").config();

//coonect to mongo

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());

app.use(bodyParser.json());

app.use(bodyParser.urlencoded({ extended: true }));

app.use(
  cookieSession({
    maxAge: 24 * 60 * 60 * 1000,
    keys: process.env.COOKIE_KEY,
  })
);
passport.use(
  new GoogleStrategy(
    {
      clientID:
        "261650862142-3msp3dgba3l9qu569b1q4bf0fcuic161.apps.googleusercontent.com",
      clientSecret: "5wTIAjfL83tOLeCcTBc-QxDj",
      callbackURL: "/auth/google/callback",
    },
    (_accessToken, _refreshToken, profile, done) => {
      //passport callback function
      //check if the user already exists in our dbwith the given  profile ID
      User.findOne({ googleId: profile.id }).then((currentUser) => {
        if (currentUser) {
          //if we alreaady have the record with the given profile
          done(null, currentUser);
        } else {
          //if not, create new user
          new User({
            googleId: profile.id,
          })
            .save()
            .then((newUser) => {
              done(null, newUser);
            });
        }
      });
    }
  )
);

passport.serializeUser((user, done) => {
  done(null, user.id);
});
passport.deserializeUser((id, done) => {
  User.findById(id).then((user) => {
    done(null, user);
  });
});

//middleware to check if the user is autheticated
function isUserAutheticated(req, res, next) {
  if (req.user) {
    next();
  } else {
    res.send("you must login");
  }
}
// Routes
app.get(
  "/auth/google",
  passport.authenticate("google", {
    scope: ["profile","email"],
  })
);

app.use("/secret", isUserAutheticated, (req, res) => {
  res.send("You habe reached our secret route");
});

app.get("/logout", (req, res) => {
  req.logout();
  res.send("cris");
});

app.use(passport.initialize());
app.use(passport.session());
// //middleware
app.get("api/current_user",(req,res)=>{
    res.send(req.user)
})
app.use("/api/user", userRouter);
// app.use('/users',user)

app.listen(PORT, () => {
  console.log(`server ruuning on port ${PORT}`);
});
