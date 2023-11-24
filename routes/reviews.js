const express = require("express");

const router = express.Router({mergeParams : true});
const Listing = require("../models/listing.js");  // exporting data module(listing data)
const Reviews = require("../models/reviews.js");  // exporting data module(review data)
const wrapAsync = require("../utiles/wrapAsync");
const {validateReview, isLoggedIn, isReviewAuthor} = require("../middleware.js");
const ReviewController = require("../contollers/review.js");


//Review Route
//Post Route
router.post("/",isLoggedIn, validateReview, wrapAsync(ReviewController.postRoute));

//Delete Review Route
router.delete("/:reviewId", isLoggedIn,isReviewAuthor, wrapAsync(ReviewController.destoryReview))

module.exports = router;