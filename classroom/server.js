const express = require("express");
const app = express();
const users = require("./routes/users.js");
const posts = require("./routes/posts.js");

const session = require("express-session");

const flash = require("connect-flash");

const path = require("path");
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

const sessionOptions = {
    secret: 'Mysupersecratestring',
    resave: false,
    saveUninitialized: true,
}

app.use(session(sessionOptions));
app.use(flash());

app.use((req,res, next) => {     // middleware using for connect-flash
    res.locals.sucessMsg = req.flash('sucess');
    res.locals.errorMsg = req.flash('error');
    next();
})

app.get("/register", (req,res) => {
    let {name = "anonymous"} = req.query;
    req.session.name = name;
    // console.log(req.session.name);
    if(name === "anonymous") {
        req.flash("error", "user not registered");
    } else {
        req.flash("sucess", "user registered successfully");
    }
    res.redirect("/hello")
})

app.get("/hello", (req,res) => {
    res.render("page.ejs", {name : req.session.name});
})

// app.get("/reqcount", (req,res) => {
//     if(req.session.count){
//         req.session.count++;
//     } else {
//         req.session.count = 1;
//     }

//     res.send(`You sent a request ${req.session.count} times `);
// })

// app.get("/test", (req,res) => {
//     res.send("test successful");
// })


// app.get("/getcookies", (req,res) => {
//     res.cookie("greet", "hello");
//     res.send("sent you some cookies");
// })

// app.get("/", (req,res)=>{
//     res.send("Hi, i am root");
// })

// app.use("/users", users);
// app.use("/posts", posts);



app.listen(3000, () => {
    console.log("server is listening to port 3000");
})