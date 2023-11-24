const Listing = require("../models/listing.js");  // exporting data module(listing data)
const Reviews = require("../models/reviews.js");  // exporting data module(review data)

module.exports.postRoute = async (req,res) => {
    //first accessing listing of id
    let listing = await Listing.findById(req.params.id);

    //creating new review
    let newReview = new Reviews(req.body.review);
    newReview.author = req.user._id;
    console.log(newReview);

    listing.reviews.push(newReview);
    await newReview.save();
    await listing.save();

    console.log("new review saved");
    res.redirect(`/listing/${listing._id}`);
}

module.exports.destoryReview = async (req,res) => {
    let {id, reviewId} = req.params;
    await Listing.findByIdAndUpdate(id, {$pull : {reviews : reviewId}});
    await Reviews.findByIdAndDelete(reviewId);

    res.redirect(`/listing/${id}`);
}