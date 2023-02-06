// external imports
import express from "express";

// internal imports
import User from "../models/User.js";
import Post from "../models/Post.js";

const router = express.Router();

// Create Post
router.post("/", async (req, res) => {
      const newPost = new Post(req.body);

      try {
        const savedPost = await newPost.save();
        res.status(200).json(savedPost);
      } catch (err) {
        res.status(500).json(err);
      }
});

// Update Post
router.put("/:id", async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (post.username === req.body.username) {
      try {
        const updatedPost = await Post.findByIdAndUpdate(req.params.id, {
          $set: req.body,
        },
        {
          new: true
        }
        );
        res.status(200).json(updatedPost);
      } catch (err) {
        res.status(500).json(err);
      }
    } else {
      res.status(401).json("You can only update your posts.");
    }
  } catch (err) {
    res.status(500).json(err);
  }
});

// Delete Post
router.delete("/:id", async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (post.username === req.body.username) {
      try {
        await post.delete();

        res.status(200).json("Post deleted successfully!");
    } catch (err) {
        res.status(500).json(err);
    }
    } else {
      res.status(401).json("You can only delete your posts.");
    }
  } catch (err) {
    res.status(500).json(err);
  }
});

// Get Post
router.get("/:id", async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    res.status(200).json(post);

  } catch (err) {
    res.status(500).json(err);
  }
});

// Get all post 
router.get("/", async (req, res) => {
const username = req.query.user;
const catName = req.query.cat;
  try {
    let posts;
    if (username) {
      posts =  await Post.find({ username });
    } else if (catName) {
      posts = await Post.find({
        categories: {
          $in: [catName],
        },
      });
    } else {
      posts = await Post.find();
    }
  
    res.status(200).json(posts);
  } catch (err) {
    res.status(500).json(err);
  }
});


export default router; 