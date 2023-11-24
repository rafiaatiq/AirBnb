if(process.env.NODE_ENV != "production"){
    require('dotenv').config();
}

console.log(process.env.SECRET);

const express = require("express");
const app = express();
const methodOverride = require("method-override");
const ExpressError = require("./utiles/ExpressError.js");
const ejsMate = require("ejs-mate");  // => package for adding styling (templates)
const session = require("express-session");  // => 
const flash = require("connect-flash");
const passport = require("passport");  // => for Authentication
const LocalStrategy = require("passport-local"); // => for Authentication
const User = require("./models/user.js");  // user schema 

// use ejs-locals for all ejs templates:
app.engine('ejs', ejsMate);

const path = require("path");
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use(express.urlencoded({extended : true}));
app.use(methodOverride("_method"));
app.use(express.static(path.join(__dirname, "/public"))); // => for public folder (serveing static files)

const mongoose = require("mongoose");

const listingRouter = require("./routes/listing.js"); // require Listing Routes => routes folder
const reviewsRouter = require("./routes/reviews.js"); // require review Routes => routes folder
const userRouter = require("./routes/user.js");  // require user Routes => routes folder


const MONGO_URL = "mongodb://127.0.0.1:27017/ForTesting";

main().then(()=> {
    console.log("Connected to DB");
}).catch((err)=> {
    console.log(err);
});

async function main() {                // creating connection with DB mongoose  
    await mongoose.connect(MONGO_URL);
}


//session Options
const sessionOptions = {
    secret : "mysuppersecretcode",
    resave : false,
    saveUninitialized : true,
    cookie : {
        expires : Date.now() + 7 * 24 * 60 * 60 * 1000,
        maxAge : 7 * 24 * 60 * 60 * 1000,
        httpOnly : true
    }
}

// app.get("/", (req,res) => {
//     res.send("Hi, i am root");
// }) 

app.use(session(sessionOptions));
app.use(flash());


app.use(passport.initialize());  //hrr sik request ky liye passport initilize ho jye ga
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));

// use static serialize and deserialize of model for passport session support
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use((req,res, next) => {
    res.locals.success = req.flash("success");
    res.locals.deleted = req.flash("deleted");
    res.locals.error = req.flash("error");
    res.locals.currUser = req.user;
    next();
})

// app.get("/demouser", async (req,res) => {
//     let fakeUser = new User ({
//         email : "rafiaatiq97@gmail.com",
//         username : "demoUser"
//     })

//     let registeredUser = await User.register(fakeUser, "HelloWorld");
//     res.send(registeredUser);
// })

//Routes
app.use("/listing", listingRouter);
app.use("/listing/:id/reviews", reviewsRouter);
app.use("/", userRouter);

//Error Handling Middle ware
app.all("*", (req,res,next)=> {
    next(new ExpressError(404, "Page not Found!!"));
})

app.use((err, req, res, next) => {
    let { statusCode = 500 , message = "Something went wrong"} = err;
    res.status(statusCode).render("error.ejs", { message });
    // res.status(statusCode).send(message);
})

app.listen(8080, ()=> {
    console.log("server is listening to port 8080");
})

// Passport is Express-compatible authentication middleware for Node.js.