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


router.route("/TrendingFilters")
//Show Listing 
.get(wrapAsync(ListingController.TrendingListings))

router.route("/FarmsFilters")
.get(wrapAsync(ListingController.FarmsListings))

router.route("/IconicCitiesFilters")
.get(wrapAsync(ListingController.IconicCitiesListings))

router.route("/RoomsFilters")
.get(wrapAsync(ListingController.RoomsListings))

router.route("/MountainsFilters")
.get(wrapAsync(ListingController.MountainsListings))

router.route("/AmazingPoolsFilters")
.get(wrapAsync(ListingController.AmazingPoolsListings))

router.route("/CastlesFilters")
.get(wrapAsync(ListingController.CastlesListings))

router.route("/CampingFilters")
.get(wrapAsync(ListingController.CampingListings))

router.route("/ArcticFilters")
.get(wrapAsync(ListingController.ArcticListings))

router.route("/DomesFilters")
.get(wrapAsync(ListingController.DomesListings))

router.route("/BoatsFilters")
.get(wrapAsync(ListingController.BoatsListings))



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