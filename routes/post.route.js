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
});

//create
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

  //Read  
  router.get("/posts/:id", (req,res)=>{

    Post.findById(req.params.id)
    .then((post) => {
        res.render("post/post", post);
    })
    .catch((err)=>{
        console.log(err);
    })
});

//Update
router.get("/update/:id", (req,res)=>{

  Post.findById(req.params.id)
  .then((post)=>{
      res.render("post/update", {post});
  })
  .catch((err)=>{
      console.log(err);
  })
});

router.post("/update/:id", (req,res)=>{
  Post.findByIdAndUpdate(req.params.id, req.body)
  .then(()=>{
      res.redirect("/");
  })
  .catch((err)=>{
      console.log(err);
  })
});

module.exports = router;