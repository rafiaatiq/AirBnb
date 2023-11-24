const User = require("../models/user.js");

module.exports.renderSignupForm = (req,res) => {
    res.render("users/signup.ejs");
}

module.exports.signup = async(req,res) => {
    try{
        let {username, email, password} = req.body;

        const newUser = new User({email, username});
        const registeredUser = await User.register(newUser, password);
        console.log(registeredUser);

        req.login(registeredUser, (err)=> {
            if(err){
                next(err);
            }
            req.flash("success", "You are Logged In!");
            res.redirect("/listing");
        })

        // req.flash("success", "user was registered");
        // res.redirect("/listing");

    } catch(e) {
        req.flash("error", e.message);
        res.redirect("/signup");
    }
    
}

module.exports.renderLoginForm = (req,res) => {
    res.render("users/login.ejs");
}

module.exports.login = async (req,res) => {
    req.flash("success", "welcome to wanderlust");
    let redirectUrl = res.locals.redirectUrl || "/listing";
    res.redirect(redirectUrl);
}

module.exports.logout = (req, res, next) => {
    req.logout((err) => {
        if(err) {
            return next(err);
        }
        req.flash("error", "You are Logged Out!");
        res.redirect("/listing");
    })
}