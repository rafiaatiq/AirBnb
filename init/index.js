const mongoose = require("mongoose");
const initData = require("./data.js");

const Listing = require("../models/listing.js");

const MONGO_URL = "mongodb://127.0.0.1:27017/ForTesting";

main().then(()=> {
    console.log("Connected to DB");
}).catch((err)=> {
    console.log(err);
});

async function main() {                // creating connection with DB mongoose  
    await mongoose.connect(MONGO_URL);
}

const initDB = async () => {
    await Listing.deleteMany({});
    
    initData.data = initData.data.map((obj) => ({...obj, owner : "6544dc5dd59d48b2aa567d88"}));

    await Listing.insertMany(initData.data);
    console.log("data was initialized");
}

initDB();