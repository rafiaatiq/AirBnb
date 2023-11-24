const express = require("express");
const router = express.Router();
const User = require("../models/user.js");
const wrapAsync = require("../utiles/wrapAsync");
const passport = require("passport");
const {saveRedirectUrl} = require("../middleware.js");

const userController = require("../contollers/users.js");

router.route("/signup")
//Sign-Up
.get(userController.renderSignupForm)
.post( wrapAsync(userController.signup));


router.route("/login")
// Login
.get(userController.renderLoginForm)

.post(saveRedirectUrl, passport.authenticate("local", { failureRedirect: '/login', failureFlash :true }), userController.login);


// Logout
router.get("/logout", userController.logout)

module.exports = router;