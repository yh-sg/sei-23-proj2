module.exports = function(req, res, moveOn){
  if(!req.user){
      req.flash("error", "You should signup and login in order to access to these pages.");
      res.redirect("/auth/login");
  }else{
      moveOn();
  }
}