const express = require("express");
const app = express();
app.use(express.json());
const PORT = 5000;

// Require DB connections and routes
require("./dbConnection");
const itemsRoute = require("./routes/itemsRoute");

app.use("/api/items/", itemsRoute);

app.get("/", (req, res) => res.send("Hello World!"));

app.listen(PORT, () => console.log("Server is running on port: " + PORT));
