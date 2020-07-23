const router = require("express").Router();
const Post = require("../models/post.model");
const User = require("../models/user.model");
const methodOverride = require('method-override');

router.use(methodOverride('_method'));

router.get("/", async (req, res) => {
  
    try {
      //req.user is current signedIn user
    if(req.user){
      //find only posts of loggedin user
      let posts = await Post.find({ writtenBy : req.user._id })

      res.render("post/home", {posts});
    }else{
      let posts = await Post.find()
  
      // console.log(posts);
      res.render("post/home", {posts});
    }
    } catch (error) {
      console.log(error);
    }
  });

  router.get("/all", async (req, res) => {
    try{
      let posts = await Post.find();
      
      res.render("post/home", {posts});
    } catch(error){
      console.log(error);
    }
  });

router.get("/compose", (req,res)=>{
  if(req.user){
    res.render("post/compose");
  }else{
    res.redirect("auth/login");
  }
});

//create
router.post("/compose", async (req,res)=>{  
  try {
    const { title, content } = req.body;
  
    const post = new Post({
      title,
      content,
      writtenBy : req.user._id
    });

    let savedPost = await post.save();

    if (savedPost) {
      //let userUpdate = await User.findByIdAndUpdate(req.user._id, { $push : { posts : post._id }})

      res.redirect("/");
    }
    }catch (error) {
      console.log(error);
    }
  });

  //COMMENT SECTION
  router.post("/comment/:id", async (req,res)=>{  
    try {
      console.log(req.body.comment);
      let commentContent = req.body.comment;

      let update = await 
      Post.findByIdAndUpdate(
      req.params.id, 
      { $push: {"comment": {message:commentContent, name: req.user._id}}});

      if (update) {
        return res.redirect("/");
      }
      }catch (error) {
        console.log(error);
      }
    });

    router.post("/:postid/removeComment/:id", async (req,res)=>{  
      try {
        let remove = await 
        Post.findByIdAndUpdate(
        req.params.postid, 
        { $pull: {"comment": {_id: req.params.id}}});
  
        if (remove) {
          return res.redirect(`/`);
        }
        }catch (error) {
          console.log(error);
        }
      });

  //Read  
  router.get("/posts/:id", (req,res)=>{

    Post.findById(req.params.id)
    .populate("writtenBy")
    .populate("comment.name")
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

// Delete
router.delete("/remove/:id", (req,res)=>{
  console.log(req.body);
  
  Post.findByIdAndDelete(req.params.id)
  .then(()=>{
      res.redirect("/");
  })
  .catch((err)=>{
      console.log(err);
  });
});

module.exports = router;