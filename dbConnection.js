const mongoose = require("mongoose");

mongoose.connect(process.env.MONGODB_URI);

let connectionObj = mongoose.connection;

connectionObj.on("connected", () => {
    console.log("MongoDB Connected");
});

connectionObj.on("error", () => {
    console.log("MongoDB Connection failure");
});
