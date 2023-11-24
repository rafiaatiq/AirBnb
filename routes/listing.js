const express = require("express");

const router = express.Router();
const wrapAsync = require("../utiles/wrapAsync");
const {isLoggedIn, isOwner, validateListing} = require("../middleware.js");
const ListingController = require("../contollers/listing.js");
const multer  = require('multer');
const {storage} = require("../cloudConfig.js");
const upload = multer({ storage });



router.route("/")
  // Index route
.get(wrapAsync(ListingController.index))
// Create Route
.post( isLoggedIn,upload.single('listing[image]'), validateListing, wrapAsync(ListingController.createListing));


// New Route
router.get("/new", isLoggedIn,ListingController.renderNewForm)


router.route("/:id")
// Show route Read data
.get(wrapAsync(ListingController.showListing))
// Update Route   // updates data
.put(isLoggedIn, isOwner,upload.single('listing[image]'), validateListing, wrapAsync(ListingController.updateListing))
// Delete Route
.delete(isLoggedIn, isOwner, wrapAsync(ListingController.deleteListing));



// Edit route    // servers a form
router.get("/:id/edit", isLoggedIn, isOwner, wrapAsync(ListingController.renderEditForm));


module.exports = router;