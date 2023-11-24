const express = require("express");

//creating Router object
const router = express.Router();

//Posts
//Index Route - post
router.get("/", (req,res) => {
    res.send("get for posts");
})

//Show Route - posts
router.get("/:id", (req,res) => {
    res.send("get for show posts");
})

//POST Route - posts
router.post("/", (req,res) => {
    res.send("Post for show posts");
})

//DELETE Route - posts
router.delete("/:id", (req,res) => {
    res.send("Delete for posts");
})

module.exports = router;