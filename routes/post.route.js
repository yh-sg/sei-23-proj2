const router = require("express").Router();
const Post = require("../models/post.model");

router.get("/", async (req, res) => {
    try {
      let posts = await Post.find()
  
      // console.log(posts);
      res.render("post/home", {posts});
    } catch (error) {
      console.log(error);
    }
  });

router.get("/compose", (req,res)=>{
    res.render("post/compose");
})

router.post("/compose", async (req,res)=>{  
  try {
    const { title, content } = req.body;
  
    const post = new Post({
      title,
      content,
    });

    let savedPost = await post.save();

    if (savedPost) {
      res.redirect("/");
    }
    }catch (error) {
      console.log(error);
    }
  });

  module.exports = router;