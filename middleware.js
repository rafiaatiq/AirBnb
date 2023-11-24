const Listing = require("./models/listing");
const {listingSchema,reviewSchema} = require("./schema.js");   // joi schemaema => Validate sch
const ExpressError = require("./utiles/ExpressError.js");
const Reviews = require("./models/reviews.js");  // exporting data module(review data)

module.exports.isLoggedIn = (req,res, next) => {
    if(!req.isAuthenticated()){
        //redirectUrl 
        req.session.redirectUrl = req.originalUrl;
        req.flash("error", "You must be logged in to create listing");
        return res.redirect("/login");
    }
    next();
}


module.exports.saveRedirectUrl = (req, res, next) => {
    if(req.session.redirectUrl) {
        res.locals.redirectUrl = req.session.redirectUrl;
    }
    next();
}

module.exports.isOwner = async (req, res, next) => {
    let {id} = req.params;
    let listing = await Listing.findById(id);
    if(!listing.owner._id.equals(res.locals.currUser._id)){
        req.flash("error", "You donot have permission to edit!");
        return res.redirect(`/listing/${id}`);
    }
    next();
}

module.exports.validateListing = (req, res, next) => {    // middle ware for validating schemas
    let {error} = listingSchema.validate(req.body);
    if(error){
        let errMsg = error.details.map((el) => el.message).join(",");
        throw new ExpressError(400, errMsg);
    } else {
        next();
    }
};

module.exports.validateReview = (req, res, next) => {    // middle ware for validating schemas
    let {error} = reviewSchema.validate(req.body);
    if(error){
        let errMsg = error.details.map((el) => el.message).join(",");
        throw new ExpressError(400, errMsg);
    } else {
        next();
    }
}

module.exports.isReviewAuthor = async (req, res, next) => {
    let {id, reviewId} = req.params;
    let review = await Reviews.findById(reviewId);
    if(!review.author._id.equals(res.locals.currUser._id)){
        req.flash("error", "You did not create this review!");
        return res.redirect(`/listing/${id}`);
    }
    next();
}