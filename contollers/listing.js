const Listing = require("../models/listing.js") // exporting data module(listing data)

const mbxGeocoding = require('@mapbox/mapbox-sdk/services/geocoding');
const mapToken = process.env.MAP_TOKEN;

const geocodingClient = mbxGeocoding({ accessToken: mapToken });

module.exports.index = async (req,res)=> {
    const allListings = await Listing.find({});
    res.render("listings/index.ejs", {allListings});
}

module.exports.renderNewForm = (req,res) => {
    res.render("listings/new.ejs");
}

module.exports.showListing = async (req,res) => {
    let {id} = req.params;
    const listing =  await Listing.findById(id).populate({path: "reviews", populate: {path :"author"}} ).populate("owner");
    if(!listing){
        req.flash("error", "Listing you requested cannot be found!");  // connect-flash
        res.redirect("/listing");
    }
    res.render("listings/show.ejs", {listing});
}

module.exports.createListing = async (req,res, next) => {
        let response =  await geocodingClient.forwardGeocode({
            query: req.body.listing.location,
            limit: 1,
          })
            .send()
            
    
    
        let url = req.file.path;
        let fileName = req.file.filename;
    
        // console.log(url, "...", fileName);
    
        const newListing = new Listing(req.body.listing);
        newListing.owner = req.user._id; 
    
        newListing.image = {url, fileName};
        newListing.geometry = response.body.features[0].geometry;

        

        
        let savedListing = await newListing.save();
        console.log(savedListing);
        
        req.flash("success", "New Listing Created!");  // connect-flash
        res.redirect("/listing");
     
}

module.exports.renderEditForm = async (req,res) => {
    let {id} = req.params;
    const listing =  await Listing.findById(id);
    if(!listing){
        req.flash("error", "Listing you requested cannot be found!");  // connect-flash
        res.redirect("/listing");
    }

    let originalImageUrl = listing.image.url;
    originalImageUrl = originalImageUrl.replace("/upload", "/upload/w_250")
    res.render("listings/edit.ejs", {listing, originalImageUrl});
}

module.exports.updateListing = async (req,res) => {
    // if(!req.body.listing){         no need to define khudsy
    //     throw new ExpressError(400, "Send valid Data for Listing");
    // }
    let {id} = req.params;
    let listing = await Listing.findByIdAndUpdate(id, {...req.body.listing});
    
    if(typeof req.file !== "undefined"){
        let url = req.file.path;
        let fileName = req.file.filename;
    
        listing.image = {url, fileName};
        await listing.save();
    }
    

    req.flash("success", "Listing Updated!");
    res.redirect(`/listing/${id}`);
}

module.exports.deleteListing = async (req,res) => {
    let {id} = req.params;
    let deletedListing = await Listing.findByIdAndDelete(id);
    req.flash("deleted", "New Listing Deleted!");  // connect-flash
    console.log(deletedListing);
    res.redirect("/listing");
}