const express = require("express");

//creating Router object
const router = express.Router();


//Index Route - users
router.get("/", (req,res) => {
    res.send("get for users");
})

//Show Route - users
router.get("/:id", (req,res) => {
    res.send("get for show users");
})

//POST Route - users
router.post("/", (req,res) => {
    res.send("Post for show users");
})

//DELETE Route - users
router.delete("/:id", (req,res) => {
    res.send("Delete for users");
})

module.exports = router;