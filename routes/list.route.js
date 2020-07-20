const router = require("express").Router();
const List = require("../models/list.model");
const Post = require("../models/post.model");

//go to the list page
router.get("/", async (req, res) => {
    try {
      let lists = await List.find();
  
      // console.log(lists);
      res.render("list/list",{lists});
    } catch (error) {
      console.log(error);
    }
  });
// CRUD

// Create
router.post("/", (req,res)=>{
  const listName = req.body.newList;
  const list = new List({name: listName})

  list.save();
  res.redirect("/list");
});

// Delete
router.post("/delete", (req,res)=>{
  const checkedItemId = req.body.checkbox;
  //console.log(checkedItemId);
  
  List.findByIdAndRemove(checkedItemId, (err)=>{
    if(!err){
      console.log("Successfully deleted checked items.");
      res.redirect("/list");
    }
  });
});

module.exports = router;