const path = require("path");
const express = require("express");
const app = express();
app.use(express.json());
const PORT = process.env.PORT || 5000;

// Require DB connections and routes
require("./dbConnection");
const itemsRoute = require("./routes/itemsRoute");
const usersRoute = require("./routes/usersRoute");
const billsRoute = require("./routes/billsRoute");

app.use("/api/items/", itemsRoute);
app.use("/api/users/", usersRoute);
app.use("/api/bills/", billsRoute);

if (process.env.NODE_ENV === "production") {
    app.use("/", express.static("checkout-client/build"));

    app.get("*", (req, res) => {
        res.sendFile(
            path.resolve(__dirname, "checkout-client/build/index.html")
        );
    });
}

app.get("/", (req, res) => res.send("Hello World!"));

app.listen(PORT, () => console.log("Server is running on port: " + PORT));
