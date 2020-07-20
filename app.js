//All variables declaration
const express = require("express");
const app = express();
const mongoose = require("mongoose");
const passport = require("./lib/passportConfig");
const session = require("express-session");
const flash = require("connect-flash");
const expressLayouts = require("express-ejs-layouts");
const checkUser = require("./lib/blockCheck");
require("dotenv").config();

//mongoose connection
mongoose.connect(
    process.env.MONGODBURL,
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
      useFindAndModify: false,
    },
    () => {
      console.log("MongoDB connected!");
    }
  );

app.use(express.static("public")); //look for static files in public folder
app.use(express.urlencoded({ extended: true })); //collects form data
app.set("view engine", "ejs"); //view engine setup
app.use(expressLayouts); //Express EJS layout to make views into block

//must come after above middleware and before routes
app.use(
  session({
    secret: process.env.SECRET,
    saveUninitialized: true,
    resave: false,
    cookie: { maxAge: 360000 },
  })
);

//must be after sessions
app.use(passport.initialize());
app.use(passport.session());
app.use(flash());
//set global variable for ejs files
app.use(function (req, res, moveOn) {
  res.locals.alerts = req.flash();
  res.locals.currentUser = req.user;
  moveOn();
});
//all routes

// app.get("/", (req,res) => {
//     res.send("Hi");
// });

app.use("/", require("./routes/post.route"));
app.use("/list", require("./routes/list.route"));
app.use("/auth", require("./routes/auth.route"));

app.listen(process.env.PORT,()=>{
    console.log(`app running on ${process.env.PORT}`);
});