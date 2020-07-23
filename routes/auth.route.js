const router = require("express").Router();
const User = require("../models/user.model");
const bcrypt = require("bcrypt");
const passport = require("../lib/passportConfig");
const saltRounds = 10;

router.get("/register", (req, res) => {
    res.render("auth/signup");
  });
  
  router.post("/register", async (req, res) => {
    try {
      let { name, email, password } = req.body;
  
      //hash password dont save password in plain text
      let hashedPassword = await bcrypt.hash(password, saltRounds);
      let user = new User({
        name,
        email,
        password: hashedPassword,
      });
  
      let savedUser = await user.save();
  
      if (savedUser) {
        res.redirect("/");
      }
    } catch (error) {
      console.log(error);
    }
  });
  
  router.get("/login", (req, res) => {
    res.render("auth/signin");
  });
  
  //-- Login Route
  router.post(
    "/login",
    passport.authenticate("local", {
      successRedirect: "/",
      failureRedirect: "/auth/login",
      failureFlash: "Invalid Email/Password, Please enter correct details",
      successFlash: `Logged In, Welcome!`
    })
  );
  
  router.get("/logout", (req, res) => {
    req.logout();
    req.flash("success", "Hope to see you again!");
    res.redirect("/auth/login");
  });
  
  module.exports = router;